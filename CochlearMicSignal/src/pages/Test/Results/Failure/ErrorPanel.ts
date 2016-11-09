import { NavController } from 'ionic-angular';
import {Component} from '@angular/core';
import {BeginTestService} from "../../BeginTest/BeginTestService.service";
import {ProgressPanel} from "../../InProgress/ProgressPanel";

@Component({
  templateUrl: 'error-page.html'
})

export class ErrorPanel {

  buttonName:String = "Test Again"

  constructor(public navCtrl: NavController, private beginTestService: BeginTestService) {

  }

  testAgain() {
    this.navCtrl.setRoot(ProgressPanel, {}, {animate: true, direction: 'left'});
  }
}
