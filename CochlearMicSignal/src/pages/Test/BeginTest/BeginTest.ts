import {NavController} from 'ionic-angular';
import {Component} from '@angular/core';
import {BeginTestService} from "./BeginTestService.service";
import {ProgressPanel} from "../InProgress/ProgressPanel";

@Component({
  templateUrl: 'begin-page.html'
})

export class BeginTest{

  buttonName:String = "Begin Test";

  constructor(public navCtrl: NavController, private beginTestService: BeginTestService) {

  }

  beginTest() {
    this.navCtrl.setRoot(ProgressPanel, {}, {animate: true, direction: 'left'});
  }
}
