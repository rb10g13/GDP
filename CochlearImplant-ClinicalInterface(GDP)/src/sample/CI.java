package sample;

public class CI {

	public String left;
	public String ear;
	private double[] initialTest;
	private double[] finalTest;
	
    public CI(String ciNumber, String ear, double[] initialTest, double[] finalTest) {
        this.left = ciNumber;
        this.ear = ear;
        this.initialTest = initialTest;
        this.finalTest = finalTest;
    }


    //represents the CI Number
    public String getLeft() {
        return left;
    }

    //represents the Faulty implant
    public String getEar() {
        return this.ear;
    }
    
    public double[] getInitial(){
    	return this.initialTest;
    }
    
    public double[] getFinal(){
    	return this.finalTest;
    }
    
}
