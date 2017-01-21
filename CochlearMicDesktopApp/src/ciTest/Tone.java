//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package ciTest;

import ciTest.Recorder;
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.Clip;
import javax.sound.sampled.FloatControl;
import javax.sound.sampled.LineUnavailableException;
import javax.sound.sampled.FloatControl.Type;

public class Tone {
    public Tone() {
    }

    public static void playTone(double[] samples) throws LineUnavailableException, InterruptedException {
        byte[] byteSamples = convertToByte(convertToShort(samples));
        AudioFormat af = new AudioFormat((float)Recorder.sampleRate, Recorder.bitsPerSample, Recorder.channels, true, true);
        Clip clip = AudioSystem.getClip();
        clip.open(af, byteSamples, 0, byteSamples.length);
        FloatControl gainControl = (FloatControl)clip.getControl(Type.MASTER_GAIN);
        clip.start();
        clip.drain();
        Thread.sleep(1000L);
        clip.close();
    }

    private static short[] convertToShort(double[] samples) {
        short[] shortSamples = new short[samples.length];

        for(int i = 0; i < shortSamples.length; ++i) {
            int converted = (int)(samples[i] * 10000.0D);
            if(converted > 32767) {
                converted = 32767;
            } else if(converted < -32768) {
                converted = -32768;
            }

            shortSamples[i] = (short)converted;
        }

        return shortSamples;
    }

    private static byte[] convertToByte(short[] samples) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        DataOutputStream dos = new DataOutputStream(baos);
        short[] var6 = samples;
        int var5 = samples.length;

        for(int var4 = 0; var4 < var5; ++var4) {
            short s = var6[var4];

            try {
                dos.writeShort(s);
            } catch (IOException var8) {
                var8.printStackTrace();
            }
        }

        return baos.toByteArray();
    }
}
