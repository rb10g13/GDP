from tone import play_tone, record
from threading import Thread

import numpy as np
import pandas as pd
import random
import wave
import matplotlib.pyplot as pl


# NEEDS TO BE SEEDED TO REMOVE RANDOMNESS
def voss(nrows, ncols=16):
    """Generates pink noise using the Voss-McCartney algorithm.

    nrows: number of values to generate
    rcols: number of random sources to add

    returns: NumPy array
    """
    array = np.empty((nrows, ncols))
    array.fill(np.nan)
    array[0, :] = np.random.random(ncols)
    array[:, 0] = np.random.random(nrows)

    # the total number of changes is nrows
    n = nrows
    cols = np.random.geometric(0.5, n)
    cols[cols >= ncols] = 0
    rows = np.random.randint(nrows, size=n)
    array[rows, cols] = np.random.random(n)

    df = pd.DataFrame(array)
    df.fillna(method='ffill', axis=0, inplace=True)
    total = df.sum(axis=1)

    return total.values


def pink_noise(start, stop, power=-1, chunk=4096, sample_rate=44100, seed = 999):
    random.seed(seed)

    # limit upper bound of stop
    if stop > (sample_rate/2):
        stop = sample_rate/2
    # auto calc mult if it is -1 (may need testing)
    if power == -1:
        power = 1.7 / (np.log10(stop) - np.log10(start))
    #generate initial array
    out = [0] * chunk
    # populate array
    for i in range(chunk//2):
        freq = i*((sample_rate/2) / ((chunk/2)-1))
        if (freq >= start ) and (freq <= stop):
            out[i] = (power*random.random()) / freq
    return out



def freq_resp_curve(soundData, sample_rate=44100, chunk=4096):

    timeArray = np.arange(0, soundData.shape[0], 1)
    timeArray = timeArray / sample_rate
    timeArray = timeArray * 1000  # scale to milliseconds

    pl.plot(timeArray, soundData, color='k')
    pl.ylabel('Amplitude')
    pl.xlabel('Time (ms)')
    pl.show()

    n = len(soundData)
    p = np.fft.fft(soundData)  # take the fourier transform
    nUniquePts = int(np.ceil((n + 1) / 2.0))
    p = p[0:nUniquePts]
    p = abs(p)

    p = p / float(n)  # scale by the number of points so that
    # the magnitude does not depend on the length
    # of the signal or on its sampling frequency
    p = p ** 2  # square it to get the power

    # multiply by two (see technical document for details)
    # odd nfft excludes Nyquist point
    if n % 2 > 0:  # we've got odd number of points fft
        p[1:len(p)] = p[1:len(p)] * 2
    else:
        p[1:len(p) - 1] = p[1:len(p) - 1] * 2  # we've got even number of points fft

    freqArray = np.arange(0, nUniquePts, 1.0) * (chunk / n);
    pl.plot(freqArray / 1000, 10 * np.log10(p), color='k')
    pl.xlabel('Frequency (kHz)')
    pl.ylabel('Power (dB)')
    pl.show()


samples = voss(44100)
freq_resp_curve(samples)


# This dosen't deal with return values... just throws them away
Thread(target= record()).start()
Thread(target = play_tone(samples)).start()
