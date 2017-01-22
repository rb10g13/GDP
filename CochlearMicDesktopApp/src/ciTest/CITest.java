package ciTest;

import ciTest.FRC;
import java.util.concurrent.ExecutionException;
import javax.sound.sampled.LineUnavailableException;

public class CITest {
    public CITest() {
    }

    public static double[] performTest() {
        double[] frcData;
        try {
            frcData = FRC.generateFRC();
        } catch (InterruptedException | ExecutionException | LineUnavailableException var5) {
            return null;
        }

        return frcData;
        
    }

    public static boolean compare(double[] initialData, double[] newData) {
        double[] difference = new double[initialData.length];

        for(int i = 0; i < initialData.length; ++i) {
            difference[i] = Math.abs(initialData[i] - newData[i]);
            if(i < 1799) {
                if(difference[i] > 4.0D) {
                    return false;
                }
            } else if(i < 3799 && difference[i] > 6.0D) {
                return false;
            }
        }

        return true;
    }
}