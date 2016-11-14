import {NavController} from 'ionic-angular';
import {Component, OnInit} from '@angular/core';
import {BeginTestService} from "./BeginTestService.service";
import {ProgressPanel} from "../InProgress/ProgressPanel";

@Component({
  templateUrl: 'begin-page.html'
})

export class BeginTest implements OnInit{

  buttonName:String = "Begin Test";

  ngOnInit() {
    this.service.pageNumber = 3;
  }

  constructor(public navCtrl: NavController, private service: BeginTestService) {

  }

  beginTest() {
    this.navCtrl.setRoot(ProgressPanel, {}, {animate: true, direction: 'left'});
  }
}
