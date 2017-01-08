import {NavController} from 'ionic-angular';
import {Component, OnInit} from '@angular/core';
import {BeginTestService} from "./BeginTestService.service";
import {ProgressPanel} from "../InProgress/ProgressPanel";

@Component({
  templateUrl: 'begin-page.html'
})

export class BeginTest implements OnInit {

  buttonName:String = "Begin Test";


  ngOnInit() {
    this.service.pageNumber = 3;
  }

  constructor(public navCtrl:NavController, private service:BeginTestService) {

  }

  beginTest() {
    var generatePinkNoise = require('openmusic-pink-noise');

    var samples:number[] = generatePinkNoise(44100);
    console.log(samples);

    //var Worker = require('webworker-threads').Worker;

    this.playAudio(samples);
    // You may also pass in a function:
    /*var worker = new Worker(function () {
      console.log("I'm working before postMessage('ali').");
      this.onmessage = function (event) {
        console.log('Hi ' + event.data);
        self.close();
      };
    });*/
    //this.navCtrl.setRoot(ProgressPanel, {}, {animate: true, direction: 'left'});

    this.recordAudio();
  }


  playAudio(samples) {
    var arrayToAudioBuffer = require('openmusic-array-to-audiobuffer');
    var audioContext = new AudioContext();
    var buffer = arrayToAudioBuffer({
      context: audioContext,
      data: samples
    });

    var bufferSource = audioContext.createBufferSource();
    bufferSource.buffer = buffer;
    bufferSource.connect(audioContext.destination);
    bufferSource.start();
  }

  recordAudio() {
    var getUserMedia = require('getusermedia');
    var MicrophoneStream = require('microphone-stream');
    var output: number[] = [];

    getUserMedia({video: false, audio: true}, function (err, stream) {
      var micStream = new MicrophoneStream(stream);

      // get Buffers (Essentially a Uint8Array DataView of the same Float32 values)
      micStream.on('data', function (chunk) {
        // Optionally convert the Buffer back into a Float32Array
        // (This actually just creates a new DataView - the underlying audio data is not copied or modified.)
        var raw = MicrophoneStream.toRaw(chunk)
        //...
        output.push(raw);
        // note: if you set options.objectMode=true, the `data` event will output AudioBuffers instead of Buffers
      });

      // or pipe it to another stream
      console.log(output);
      
      // It also emits a format event with various details (frequency, channels, etc)
      micStream.on('format', function (format) {
        console.log(format);
      });

      // Stop when ready
      document.getElementById('my-stop-button').onclick = function () {
        micStream.stop();
      };
    });
  }
}
