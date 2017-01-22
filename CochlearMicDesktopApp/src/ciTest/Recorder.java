//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package ciTest;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.concurrent.Callable;
import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.LineUnavailableException;
import javax.sound.sampled.Mixer;
import javax.sound.sampled.TargetDataLine;
import javax.sound.sampled.Mixer.Info;

public class Recorder implements Callable<float[]> {
    public static int sampleRate = 44100;
    public static int bitsPerSample = 16;
    public static int channels = 1;

    public Recorder() {
    }

    public float[] call() throws LineUnavailableException {
        byte duration = 3;
        TargetDataLine line = null;
        Info[] mixerInfo = AudioSystem.getMixerInfo();

        for(int af = 0; af < mixerInfo.length; ++af) {
            Mixer baos = AudioSystem.getMixer(mixerInfo[af]);
            javax.sound.sampled.Line.Info[] buf = baos.getTargetLineInfo();
            if(buf.length > 0) {
                line = (TargetDataLine)baos.getLine(buf[0]);
                break;
            }
        }

        if(line == null) {
            throw new UnsupportedOperationException("No recording device found");
        } else {
            AudioFormat var12 = new AudioFormat((float)sampleRate, bitsPerSample, channels, true, true);
            line.open(var12);
            line.start();
            ByteArrayOutputStream var13 = new ByteArrayOutputStream();
            byte[] var14 = new byte[(int)var12.getSampleRate() * var12.getFrameSize()];
            long end = System.currentTimeMillis() + (long)(1000 * duration);

            int len;
            while(System.currentTimeMillis() < end && (len = line.read(var14, 0, var14.length)) != -1) {
                var13.write(var14, 0, len);
            }

            line.stop();
            line.close();

            try {
                var13.close();
            } catch (IOException var11) {
                var11.printStackTrace();
            }

            return this.floatMe(this.shortMe(var13.toByteArray()));
        }
    }

    private short[] shortMe(byte[] bytes) {
        short[] out = new short[bytes.length / 2];
        ByteBuffer bb = ByteBuffer.wrap(bytes);

        for(int i = 0; i < out.length; ++i) {
            out[i] = bb.getShort();
        }

        return out;
    }

    private float[] floatMe(short[] pcms) {
        float[] floaters = new float[pcms.length];

        for(int i = 0; i < pcms.length; ++i) {
            floaters[i] = (float)pcms[i];
        }

        return floaters;
    }
}
