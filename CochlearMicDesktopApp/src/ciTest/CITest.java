package ciTest;

        import ciTest.FRC;
        import db.DatabaseController;
        import java.util.concurrent.ExecutionException;
        import javax.sound.sampled.LineUnavailableException;

public class CITest {
    public CITest() {
    }

    public static int performTest(int ciNumber) {
        double[] frcData;
        try {
            frcData = FRC.generateFRC();
        } catch (InterruptedException | ExecutionException | LineUnavailableException var5) {
            return -2;
        }

        DatabaseController dbc = new DatabaseController();
        double[] initialTest = dbc.getInitialTestData(ciNumber);
        if(initialTest == null) {
            dbc.pushTestResult(ciNumber, frcData, -1);
            dbc.shutdown();
            return -1;
        } else {
            boolean testOutcome = compare(initialTest, frcData);
            if(testOutcome) {
                dbc.pushTestResult(ciNumber, frcData, 1);
                dbc.shutdown();
                return 1;
            } else {
                dbc.pushTestResult(ciNumber, frcData, 0);
                dbc.shutdown();
                return 0;
            }
        }
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