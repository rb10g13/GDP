//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package ciTest;

public class FFT {
    public FFT() {
    }

    public static double[] transform(double[] real, double[] imag) {
        if(real.length != imag.length) {
            throw new IllegalArgumentException("Mismatched lengths");
        } else {
            int n = real.length;
            return n == 0?null:((n & n - 1) == 0?transformRadix2(real, imag):transformBluestein(real, imag));
        }
    }

    public static void inverseTransform(double[] real, double[] imag) {
        transform(imag, real);
    }

    public static double[] transformRadix2(double[] real, double[] imag) {
        if(real.length != imag.length) {
            throw new IllegalArgumentException("Mismatched lengths");
        } else {
            int n = real.length;
            int levels = 31 - Integer.numberOfLeadingZeros(n);
            if(1 << levels != n) {
                throw new IllegalArgumentException("Length is not a power of 2");
            } else {
                double[] cosTable = new double[n / 2];
                double[] sinTable = new double[n / 2];

                int size;
                for(size = 0; size < n / 2; ++size) {
                    cosTable[size] = Math.cos(6.283185307179586D * (double)size / (double)n);
                    sinTable[size] = Math.sin(6.283185307179586D * (double)size / (double)n);
                }

                int halfsize;
                for(size = 0; size < n; ++size) {
                    halfsize = Integer.reverse(size) >>> 32 - levels;
                    if(halfsize > size) {
                        double tablestep = real[size];
                        real[size] = real[halfsize];
                        real[halfsize] = tablestep;
                        tablestep = imag[size];
                        imag[size] = imag[halfsize];
                        imag[halfsize] = tablestep;
                    }
                }

                for(size = 2; size <= n; size *= 2) {
                    halfsize = size / 2;
                    int var16 = n / size;

                    for(int i = 0; i < n; i += size) {
                        int j = i;

                        for(int k = 0; j < i + halfsize; k += var16) {
                            double tpre = real[j + halfsize] * cosTable[k] + imag[j + halfsize] * sinTable[k];
                            double tpim = -real[j + halfsize] * sinTable[k] + imag[j + halfsize] * cosTable[k];
                            real[j + halfsize] = real[j] - tpre;
                            imag[j + halfsize] = imag[j] - tpim;
                            real[j] += tpre;
                            imag[j] += tpim;
                            ++j;
                        }
                    }

                    if(size == n) {
                        break;
                    }
                }

                return real;
            }
        }
    }

    public static double[] transformBluestein(double[] real, double[] imag) {
        if(real.length != imag.length) {
            throw new IllegalArgumentException("Mismatched lengths");
        } else {
            int n = real.length;
            if(n >= 536870912) {
                throw new IllegalArgumentException("Array too large");
            } else {
                int m = Integer.highestOneBit(n * 2 + 1) << 1;
                double[] cosTable = new double[n];
                double[] sinTable = new double[n];

                for(int areal = 0; areal < n; ++areal) {
                    int aimag = (int)((long)areal * (long)areal % (long)(n * 2));
                    cosTable[areal] = Math.cos(3.141592653589793D * (double)aimag / (double)n);
                    sinTable[areal] = Math.sin(3.141592653589793D * (double)aimag / (double)n);
                }

                double[] var13 = new double[m];
                double[] var14 = new double[m];

                for(int breal = 0; breal < n; ++breal) {
                    var13[breal] = real[breal] * cosTable[breal] + imag[breal] * sinTable[breal];
                    var14[breal] = -real[breal] * sinTable[breal] + imag[breal] * cosTable[breal];
                }

                double[] var15 = new double[m];
                double[] bimag = new double[m];
                var15[0] = cosTable[0];
                bimag[0] = sinTable[0];

                for(int creal = 1; creal < n; ++creal) {
                    var15[creal] = var15[m - creal] = cosTable[creal];
                    bimag[creal] = bimag[m - creal] = sinTable[creal];
                }

                double[] var16 = new double[m];
                double[] cimag = new double[m];
                convolve(var13, var14, var15, bimag, var16, cimag);

                for(int i = 0; i < n; ++i) {
                    real[i] = var16[i] * cosTable[i] + cimag[i] * sinTable[i];
                    imag[i] = -var16[i] * sinTable[i] + cimag[i] * cosTable[i];
                }

                return real;
            }
        }
    }

    public static void convolve(double[] x, double[] y, double[] out) {
        if(x.length == y.length && x.length == out.length) {
            int n = x.length;
            convolve(x, new double[n], y, new double[n], out, new double[n]);
        } else {
            throw new IllegalArgumentException("Mismatched lengths");
        }
    }

    public static void convolve(double[] xreal, double[] ximag, double[] yreal, double[] yimag, double[] outreal, double[] outimag) {
        if(xreal.length == ximag.length && xreal.length == yreal.length && yreal.length == yimag.length && xreal.length == outreal.length && outreal.length == outimag.length) {
            int n = xreal.length;
            xreal = (double[])xreal.clone();
            ximag = (double[])ximag.clone();
            yreal = (double[])yreal.clone();
            yimag = (double[])yimag.clone();
            transform(xreal, ximag);
            transform(yreal, yimag);

            int i;
            for(i = 0; i < n; ++i) {
                double temp = xreal[i] * yreal[i] - ximag[i] * yimag[i];
                ximag[i] = ximag[i] * yreal[i] + xreal[i] * yimag[i];
                xreal[i] = temp;
            }

            inverseTransform(xreal, ximag);

            for(i = 0; i < n; ++i) {
                outreal[i] = xreal[i] / (double)n;
                outimag[i] = ximag[i] / (double)n;
            }

        } else {
            throw new IllegalArgumentException("Mismatched lengths");
        }
    }
}
