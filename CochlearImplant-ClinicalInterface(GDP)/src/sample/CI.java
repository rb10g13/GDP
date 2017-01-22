package sample;

public class CI {

	private int ciNumber;
	private String ear;
	private double[] initialTest;
	private double[] finalTest;
	
    public CI(int ciNumber, String ear, double[] initialTest, double[] finalTest) {
        this.ciNumber = ciNumber;
        this.ear = ear;
        this.initialTest = initialTest;
        this.finalTest = finalTest;
    }


    //represents the CI Number
    public int getCINumber() {
        return ciNumber;
    }

    //represents the Faulty implant
    public String getEar() {
        return this.ear;
    }
    
    public double[] getInitial(){
    	return this.intialTest;
    }
    
    public double[] getFinal(){
    	return this.finalTest;
    }
    
}
