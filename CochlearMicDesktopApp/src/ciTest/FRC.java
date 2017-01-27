//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package ciTest;

import ciTest.FFT;
import ciTest.PinkNoise;
import ciTest.Recorder;
import ciTest.Tone;
import flanagan.analysis.CurveSmooth;
import java.util.Arrays;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import javax.sound.sampled.LineUnavailableException;

public class FRC {
    public FRC() {
    }

    public static double[] generateFRC() throws LineUnavailableException, InterruptedException, ExecutionException {
        double[] recordData = recordTone();
        double[] fftData = FFT.transform(recordData, new double[recordData.length]);
        int numPoints = (int)Math.ceil((double)((fftData.length + 1) / 2));
        fftData = Arrays.copyOfRange(fftData, 0, numPoints);

        for(int cs = 0; cs < fftData.length; ++cs) {
            fftData[cs] /= (double)fftData.length;
            fftData[cs] = Math.pow(fftData[cs], 2.0D);
            fftData[cs] = Math.log10(fftData[cs]);
            fftData[cs] *= 10.0D;
        }

        fftData = Arrays.copyOfRange(fftData, 199, 7999);
        CurveSmooth var4 = new CurveSmooth(fftData);
        var4.setSGpolyDegree(1);
        return var4.savitzkyGolay(101);
    }

    private static double[] recordTone() throws LineUnavailableException, InterruptedException, ExecutionException {
        PinkNoise pn = new PinkNoise();
        double[] pinkNoiseSamples = new double[Recorder.sampleRate];

        for(int pool = 0; pool < pinkNoiseSamples.length; ++pool) {
            pinkNoiseSamples[pool] = pn.nextValue();
        }

        ExecutorService var4 = Executors.newFixedThreadPool(1);
        Future recordData = var4.submit(new Recorder());
        Thread.sleep(1000L);
        Tone.playTone(pinkNoiseSamples);

        while(!recordData.isDone()) {
            ;
        }

        var4.shutdown();
        return grabTone((float[])recordData.get());
    }

    private static double[] grabTone(float[] recording) {
        int windowSize = Recorder.sampleRate;
        int maxWindowIndex = -1;
        float maxWindowAverage = 0.0F;

        for(int newData = 0; newData < 2 * windowSize; ++newData) {
            float count = average(Arrays.copyOfRange(recording, newData, newData + 44100));
            if(count > maxWindowAverage) {
                maxWindowIndex = newData;
                maxWindowAverage = count;
            }
        }

      //Get the portion of the array required and convert to double
  		double[] newData = new double[44100];
  		int count = 0;
  		for(int i = maxWindowIndex; i < maxWindowIndex+44100; i++){
  			newData[count] = (double) recording[i];
 			//System.out.println(newData[count]);
  			count++;
  		}
  		
  		return newData;
  	}
    private static float average(float[] data) {
        float total = 0.0F;
        float[] var5 = data;
        int var4 = data.length;

        for(int var3 = 0; var3 < var4; ++var3) {
            float f = var5[var3];
            total += Math.abs(f);
        }

        return total / (float)data.length;
    }
}
