package ciTest;

import java.util.Arrays;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import javax.sound.sampled.LineUnavailableException;

import flanagan.analysis.CurveSmooth;

public class FRC {
	
	
	/*Records sound from the CI
	 * Generates a FRC of that recording
	 * Cuts it to just the frequencies we require
	 *Returns a float array corresponding to the dB values 
	 */
	public static double[] generateFRC() throws LineUnavailableException, InterruptedException, ExecutionException{
		//Get the recording
		double[] recordData = recordTone();
		//Get the FFT of the recording
		double[] fftData =FFT.transform(recordData, new double[recordData.length]);
		
		//Throw away second half
		int numPoints = (int) Math.ceil((fftData.length+1)/2);
		fftData = Arrays.copyOfRange(fftData, 0, numPoints);

		/*For each point:
		 * -take the absolute
		 * -Scale by length so magnitude does not depend on length
		 * -Square it
		 * -Take the log
		 */
		for(int i=0; i<fftData.length; i++){
			fftData[i] = Math.abs(fftData[i]);
			fftData[i] = fftData[i]/fftData.length;
			fftData[i] = Math.pow(fftData[i], 2);
			fftData[i] = Math.log10(fftData[i]);
		}
		
		//Trim to be between the frequency range of the device (200-8k)
		fftData = Arrays.copyOfRange(fftData, 199, 7999);
		
		//Perform Savitzky Golay filtering to smooth the data
		//http://www.ee.ucl.ac.uk/~mflanaga/java/CurveSmooth.html
		CurveSmooth cs = new CurveSmooth(fftData);
		cs.setSGpolyDegree(1);
		return cs.savitzkyGolay(101);
	}
	
	/*Handles:
	 * Generating pink noise samples
	 * Playing samples
	 * Simultaneously recording
	 * Trimming the recording to just give data we need
	 *Returns float of sound data
	 */
	private static double[] recordTone() throws LineUnavailableException, InterruptedException, ExecutionException{
		//Get pink noise samples
		PinkNoise pn = new PinkNoise();
		double[] pinkNoiseSamples = new double[Recorder.sampleRate];
		for(int i = 0; i < pinkNoiseSamples.length; i++){
			pinkNoiseSamples[i] = pn.nextValue();
		}
				
		
		ExecutorService pool = Executors.newFixedThreadPool(1);
		Future<float[]> recordData = pool.submit(new Recorder());
		try {
			Thread.sleep(1000);
		} catch (InterruptedException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Tone.playTone(pinkNoiseSamples);
		while(!recordData.isDone()){}
		pool.shutdown();
		return grabTone(recordData.get());

		

	}
	
	
	/*Given the recording
	 * pulls the part of the recording which is known to be the tone
	 *Returns this as a float array of sound data 
	 */
	private static double[] grabTone(float[] recording){
		int startPoint = -1;
		for(int i = 0; i < recording.length; i++){
			if(recording[i] > 30000){
				startPoint = i;	
				break;
			}
		}
		
		//Get the portion of the array required and convert to double
		double[] newData = new double[44100];
		int count = 0;
		for(int i = startPoint; i < startPoint+44100; i++){
			newData[count] = (double) recording[i];
			count++;
		}
		
		return newData;
	}
	
	

	
}
