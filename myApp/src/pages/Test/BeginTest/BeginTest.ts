import {NavController} from 'ionic-angular';
import {Component, OnInit} from '@angular/core';
import {BeginTestService} from "./BeginTestService.service";
import {ProgressPanel} from "../InProgress/ProgressPanel";
import { NetworkService } from "../../Shared/NetworkService";
import { ImplantIdService } from "../../Shared/ImplantIdService";

@Component({
  templateUrl: 'begin-page.html'
})

export class BeginTest implements OnInit {

  buttonName:String;
  initialRecording: boolean;


  ngOnInit() {
    this.service.pageNumber = 3;
  }

  constructor(
    public navCtrl:NavController,
    private service:BeginTestService,
    private networkService: NetworkService,
    private implantService: ImplantIdService
    ) {
    this.networkService.recordingExists(this.implantService.getId())
      .subscribe(
        data => {
          console.log(data);
          this.buttonName = "Begin Test";
          this.initialRecording = false;
        },
        error => {
          console.log(error);
          this.buttonName = "Record Control";
          this.initialRecording = true;
        }
      );
  }

  beginTest() {
    var generatePinkNoise = require('openmusic-pink-noise');
    var samples:number[] = generatePinkNoise(44100);
    var finished: boolean = false;

   /* const spawn = require('threads').spawn;

    const thread = spawn(function(input, done) {
      //console.log('something');
      //output = this.recordAudio();
      //console.log("-------->" + output);
      // Everything we do here will be run in parallel in another execution context.
      // Remember that this function will be executed in the thread's context,
      // so you cannot reference any value of the surrounding code.
      done({ function : input });

    });

     thread.send({ function : this.recordAudio })
     // The handlers come here: (none of them is mandatory)
     .on('message', function(response) {
       console.log("-------->" + response;
     thread.kill();
     })
     .on('error', function(error) {
     console.error('Worker errored:', error);
     })
     .on('exit', function() {
     console.log('Worker has been terminated.');
     });
*/


    /*var Worker = require('webworker-threads/src/worker.js');

     // You may also pass in a function:
     var worker = new Worker(function () {
     console.log("I'm working before postMessage('ali').");
     /!*this.onmessage = function (event) {
     console.log('Hi ' + event.data);
     output = this.recordAudio();
     self.close();
     };*!/
     });*/


    /*while(finished == false) {
     if(output.length != 0) {
     finished = true;

     }
     }*/
    // this.playAudio(samples);
    // this.recordAudio();
    //set root and send the output array to the server
    this.navCtrl.setRoot(ProgressPanel, {}, {animate: true, direction: 'left'});
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
    var count = 0;

    getUserMedia({video: false, audio: true}, function (err, stream) {
      var micStream = new MicrophoneStream(stream);
      console.log('stream ' + stream);
      var sample_rate = 44100;
      var chunkSize = 4096;
      var duration = 3;
      // get Buffers (Essentially a Uint8Array DataView of the same Float32 values)
      micStream.on('data', function (chunk) {
        // Optionally convert the Buffer back into a Float32Array
        // (This actually just creates a new DataView - the underlying audio data is not copied or modified.)
        if(count >= sample_rate / chunkSize * duration) {
          micStream.stop();
          return output;
        } else {
          count++;
          var raw = MicrophoneStream.toRaw(chunk);
          console.log(raw);
          output.push(raw);
        }
      });
    });

    console.log("bla")
  }
}
