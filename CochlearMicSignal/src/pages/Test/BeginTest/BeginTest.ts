import {NavController, AlertController} from 'ionic-angular';
import {Component, OnInit} from '@angular/core';
import {BeginTestService} from "./BeginTestService.service";
import {ProgressPanel} from "../InProgress/ProgressPanel";
import {MediaPlugin, CaptureAudioOptions} from "ionic-native/dist/es5/index";
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions, File, FileSystem } from 'ionic-native';

@Component({
  templateUrl: 'begin-page.html'
})

export class BeginTest implements OnInit {

  buttonName:String = "Begin Test";


  ngOnInit() {
    this.service.pageNumber = 3;
  }

  constructor(public navCtrl:NavController, private service:BeginTestService, private alertCtrl: AlertController) {

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
    this.playAudio(samples);
    this.recordAudio();
    //set root and send the output array to the server
    //this.navCtrl.setRoot(ProgressPanel, {}, {animate: true, direction: 'left'});
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

  myFunction() {
    setTimeout(null, 3000);
  }

  recordAudio() {
// Recording to a file
    let arr: number[] = [];
    let mediaFiles: MediaFile[][] = [];
    let options: CaptureAudioOptions = { limit: 1, duration: 3};
    MediaCapture.captureAudio(options).then(
      (data: MediaFile[]) => mediaFiles.push(data),
      (err: CaptureError) => console.error(err));
    console.log('-> '+mediaFiles);
    /*  var newFile = new MediaPlugin('Media.txt');
      newFile.startRecord();
      newFile.stopRecord();
      this.playAlert('tesrt');*/
  }

  playAlert(raw) {
    var message = raw.toString();
    let alert2 = this.alertCtrl.create({
      title: "Message",
      message: message,
      buttons: ["OK"]
    });
    alert2.present();
  }
}
