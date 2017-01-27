//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package ciTest;

import java.util.Random;

public class PinkNoise {
    private final int poles;
    private final double[] multipliers;
    private final double[] values;
    private final Random rnd;

    public PinkNoise() {
        this(1.0D, 5, new Random(999L));
    }

    public PinkNoise(double alpha, int poles, Random random) {
        if(alpha >= 0.0D && alpha <= 2.0D) {
            this.rnd = random;
            this.poles = poles;
            this.multipliers = new double[poles];
            this.values = new double[poles];
            double a = 1.0D;

            int i;
            for(i = 0; i < poles; ++i) {
                a = ((double)i - alpha / 2.0D) * a / (double)(i + 1);
                this.multipliers[i] = a;
            }

            for(i = 0; i < 5 * poles; ++i) {
                this.nextValue();
            }

        } else {
            throw new IllegalArgumentException("Invalid pink noise alpha = " + alpha);
        }
    }

    public double nextValue() {
        double x = this.rnd.nextGaussian();

        for(int i = 0; i < this.poles; ++i) {
            x -= this.multipliers[i] * this.values[i];
        }

        System.arraycopy(this.values, 0, this.values, 1, this.values.length - 1);
        this.values[0] = x;
        return x;
    }
}
