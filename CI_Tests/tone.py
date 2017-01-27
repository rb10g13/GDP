# import pyaudio
import numpy as np


# Takes a sample and plays them
def play_tone(sample, sample_rate=44100, duration=1):
    p = pyaudio.PyAudio()
    stream = p.open(format=pyaudio.paFloat32,
                    channels=1,
                    rate=sample_rate,
                    output=True)

    for i in range(duration):
        stream.write(sample)

    stream.stop_stream()
    stream.close()
    p.terminate()


# Records from mic-in for the duration given
def record(queue, sample_rate=44100, chunk=4096, duration=3):
    p = pyaudio.PyAudio()

    # start Recording
    stream = p.open(format= pyaudio.paInt16,
                    channels=1,
                    rate=sample_rate,
                    input=True,
                    frames_per_buffer=chunk)

    frames = []
    for i in range(0, int(sample_rate / chunk * duration)):
        data = stream.read(chunk)
        frames.append(data)


    # stop Recording
    stream.stop_stream()
    stream.close()
    p.terminate()

    # Convert binary data to decimal for processing
    dec_frames = []
    for i in range(len(frames)):
        dec_frames.append(np.fromstring(frames[i], np.int16))

    # Place recording in queue to be used by main thread
    queue.put(np.array(dec_frames))

