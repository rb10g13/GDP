from tone import play_tone, record
from multiprocessing import Process, Queue

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

    seeded = np.random.RandomState(seed=999)

    array = np.empty((nrows, ncols))
    array.fill(np.nan)
    array[0, :] = seeded.random_sample(size=ncols)
    array[:, 0] = seeded.random_sample(size=nrows)

    # the total number of changes is nrows
    n = nrows
    cols = seeded.geometric(0.5, n)
    cols[cols >= ncols] = 0
    rows = seeded.randint(nrows, size=n)
    array[rows, cols] = seeded.random_sample(n)

    df = pd.DataFrame(array)
    df.fillna(method='ffill', axis=0, inplace=True)
    total = df.sum(axis=1)

    return total.values


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

    return [freqArray, p]
#    pl.plot(freqArray / 1000, 10 * np.log10(p), color='k')
#    pl.xlabel('Frequency (kHz)')
#    pl.ylabel('Power (dB)')
#    pl.show()


def pull_recording(recording, sample_rate=44100):
    start_point = -1
    for x in range(len(recording)):
        if recording[x] > 1000:
            start_point = x
            break
    end_point = start_point+sample_rate
    print(str(end_point-start_point))

    return np.array([recording[x] for x in range(start_point, end_point)])


def main(sample_rate=44100):
    if __name__ == '__main__':
        queue = Queue()
        samples = voss(sample_rate*4)

        # t = np.linspace(0, 10, 44100)
        # samples = chirp(t, f0=12.5, f1=2.5, t1=10, method='linear')

        Process(target=record, args=(queue,)).start()
        Process(target=play_tone, args=(samples,)).start()
        flattened = [x for sublist in queue.get() for x in sublist]

        return freq_resp_curve(pull_recording(flattened))



