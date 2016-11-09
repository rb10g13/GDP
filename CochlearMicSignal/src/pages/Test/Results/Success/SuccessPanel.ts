import { NavController } from 'ionic-angular';
import {Component, OnInit} from '@angular/core';
import {BeginTestService} from "../../BeginTest/BeginTestService.service";
import {HomePage} from "../../../HomePage/HomePage";

@Component({
  templateUrl: 'success-page.html'
})

export class SuccessPanel {

  buttonName:String = "Finish"

  constructor(public navCtrl: NavController, private beginTestService: BeginTestService) {

  }

  testAgain() {
    this.navCtrl.setRoot(HomePage, {}, {animate: true, direction: 'left'});
  }
}
