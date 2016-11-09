import {NavController,Button} from 'ionic-angular';
import {Component, ViewChild, OnInit} from '@angular/core';
import {Header} from '../../Shared/Header/Header';
import {Footer} from '../../Shared/Footer/Footer';
import {BeginTestService} from "./BeginTestService.service";
import {ProgressPanel} from "../InProgress/ProgressPanel";

@Component({
  templateUrl: 'begin-page.html'
})

export class BeginTest implements OnInit{

  constructor(public navCtrl: NavController, private beginTestService: BeginTestService) {

  }

  ngOnInit() {
    this.beginTestService.buttonName = "Begin Test";
  }

  beginTest() {
    this.navCtrl.pop(BeginTest);
    this.navCtrl.setRoot(ProgressPanel, {}, {animate: true, direction: 'left'});
  }
}
