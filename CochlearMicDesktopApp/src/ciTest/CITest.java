package ciTest;

import java.util.concurrent.ExecutionException;

import javax.sound.sampled.LineUnavailableException;

import db.DatabaseController;

public class CITest {

	/*Returns:
	 * 1 - test passed
	 * 0 - test failed
	 * -1 - initial test
	 * -2 - Error
	 */
	public static int performTest(int ciNumber){
		double[] frcData;
		try {
			frcData = FRC.generateFRC();
			//for(double d : frcData) System.out.println(d);
		} catch (LineUnavailableException | InterruptedException | ExecutionException e) {
			// If there is any error within the process, return the error identifier
			return -2;
		}
		
		DatabaseController dbc = new DatabaseController();
		double[] initialTest = dbc.getInitialTestData(ciNumber);
		if(initialTest == null){
			//If there was no previous test, return
			dbc.pushTestResult(ciNumber, frcData, -1);
			dbc.shutdown();
			return -1;
		}else{
			//Store the new test data
			dbc.shutdown();
			boolean testOutcome = compare(initialTest, frcData);
			if(testOutcome){
				dbc.pushTestResult(ciNumber, frcData, 1);
				return 1;
			}else{
				dbc.pushTestResult(ciNumber, frcData, 0);
				return 0;
			}
		}

	}
	
	/*Takes the initial test data and the new test data:
	*	Calculates the difference between them
	*	Checks that the difference is within the given guidelines
	*/
	private static boolean compare(double[] initialData, double[] newData){
		double[] difference = new double[initialData.length];
		
		for(int i=0; i<initialData.length;i++){
			difference[i] = Math.abs(initialData[i]-newData[i]);

			if(i<1799){
				//from 200Hz to 2kHz, difference must be below 4dB
				if(difference[i] > 4){
					return false;
				}
			}else if(i < 3799){
				//from 2kHz to 4kHz, difference must be below 6dB
				if(difference[i] > 6){
					return false;
				}
			}
			
		}
		
		return true;
	}
	
}
