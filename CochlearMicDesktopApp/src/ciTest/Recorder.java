package ciTest;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.concurrent.Callable;

import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.Line;
import javax.sound.sampled.LineUnavailableException;
import javax.sound.sampled.Mixer;
import javax.sound.sampled.Mixer.Info;
import javax.sound.sampled.TargetDataLine;

public class Recorder implements Callable<float[]> {
	
	public static int sampleRate = 44100;
	public static int bitsPerSample = 16;
	public static int channels = 1;
	
	@Override
	public float[] call() throws Exception {
		 int duration = 3;
		    TargetDataLine line = null;
		    // find a DataLine that can be read
		    Info[] mixerInfo = AudioSystem.getMixerInfo();
		    for (int i = 0; i < mixerInfo.length; i++) {
		        Mixer mixer = AudioSystem.getMixer(mixerInfo[i]);
		        Line.Info[] targetLineInfo = mixer.getTargetLineInfo();
		        if (targetLineInfo.length > 0) {
		            try {
						line = (TargetDataLine) mixer.getLine(targetLineInfo[0]);
					} catch (LineUnavailableException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
		            break;
		        }
		    }
		    if (line == null)
		        throw new UnsupportedOperationException("No recording device found");
		    AudioFormat af = new AudioFormat(sampleRate, bitsPerSample, channels, true, true);
		    try {
				line.open(af);
			} catch (LineUnavailableException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		    line.start();
		    ByteArrayOutputStream baos = new ByteArrayOutputStream();
		    byte[] buf = new byte[(int)af.getSampleRate() * af.getFrameSize()];
		    long end = System.currentTimeMillis() + 1000 * duration;
		    int len;
		    while (System.currentTimeMillis() < end && ((len = line.read(buf, 0, buf.length)) != -1)) {
		        baos.write(buf, 0, len);
		    }
		    line.stop();
		    line.close();
		    try {
				baos.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		   
		    return floatMe(shortMe(baos.toByteArray()));
	}
	
	private short[] shortMe(byte[] bytes) {
	    short[] out = new short[bytes.length / 2]; // will drop last byte if odd number
	    ByteBuffer bb = ByteBuffer.wrap(bytes);
	    for (int i = 0; i < out.length; i++) {
	        out[i] = bb.getShort();
	    }
	    return out;
	}
	
	private float[] floatMe(short[] pcms) {
	    float[] floaters = new float[pcms.length];
	    for (int i = 0; i < pcms.length; i++) {
	        floaters[i] = pcms[i];
	    }
	    return floaters;
	}

}
