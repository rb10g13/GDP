package ciTest;

import java.util.Random;

// I stole this code from http://sampo.kapsi.fi/PinkNoise/PinkNoise.java

public class PinkNoise {
    private final int poles;
    private final double[] multipliers;
    
    private final double[] values;
    private final Random rnd;

    
    /**
     * Generate pink noise with alpha=1.0 using a five-pole IIR.
     */
    public PinkNoise() {
        this(1.0, 5, new Random(999));
    }

    /**
     * Generate pink noise from a specific randomness source
     * specifying alpha and the number of poles.  The larger the
     * number of poles, the lower are the lowest frequency components
     * that are amplified.
     * 
     * @param alpha   the exponent of the pink noise, 1/f^alpha.
     * @param poles   the number of poles to use.
     * @param random  the randomness source.
     * @throws IllegalArgumentException  if <code>alpha < 0</code> or
     *                                      <code>alpha > 2</code>.
     */
    public PinkNoise(double alpha, int poles, Random random) {
	if (alpha < 0 || alpha > 2) {
	    throw new IllegalArgumentException("Invalid pink noise alpha = " +
					       alpha);
	}

        this.rnd = random;
        this.poles = poles;
        this.multipliers = new double[poles];
        this.values = new double[poles];
        
        double a = 1;
        for (int i=0; i < poles; i++) {
            a = (i - alpha/2) * a / (i+1);
            multipliers[i] = a;
        }
        
        // Fill the history with random values
        for (int i=0; i < 5*poles; i++)
            this.nextValue();
    }
    
    
    /**
     * Return the next pink noise sample.
     *
     * @return  the next pink noise sample.
     */
    public double nextValue() {
	/*
	 * The following may be changed to  rnd.nextDouble()-0.5
	 * if strict Gaussian distribution of resulting values is not
	 * required.
	 */
        double x = rnd.nextGaussian();
        
        for (int i=0; i < poles; i++) {
            x -= multipliers[i] * values[i];
        }
        System.arraycopy(values, 0, values, 1, values.length-1);
        values[0] = x;
        return x;
    }
   
}