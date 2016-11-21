import pyaudio
import numpy as np
import wave

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


def record(sample_rate=44100, chunk=4096, duration=5):

    p = pyaudio.PyAudio()

    # start Recording
    stream = p.open(format= pyaudio.paInt16,
                    channels=1,
                    rate=sample_rate,
                    input=True,
                    frames_per_buffer=chunk)

    print
    "recording..."
    frames = []

    for i in range(0, int(sample_rate / chunk * duration)):
        data = stream.read(chunk)
        frames.append(data)
    print
    "finished recording"

    # stop Recording
    stream.stop_stream()
    stream.close()
    p.terminate()

    # Convert binary data to decimal for processing
    dec_frames = []
    for i in range(len(frames)):
        dec_frames.append(np.fromstring(frames[i], np.int16))

    return np.array(dec_frames)

