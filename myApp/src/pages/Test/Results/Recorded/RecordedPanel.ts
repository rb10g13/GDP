import { NavController } from 'ionic-angular';
import {Component, OnInit} from '@angular/core';
import {BeginTestService} from "../../BeginTest/BeginTestService.service";
import {HomePage} from "../../../HomePage/HomePage";

@Component({
  templateUrl: 'recorded.html'
})

export class RecordedPanel implements OnInit{

  buttonName:String = "Finish"

  ngOnInit() {
    this.service.pageNumber = 4;
  }

  constructor(public navCtrl: NavController, private service: BeginTestService) {}

  testAgain() {
    this.navCtrl.setRoot(HomePage, {}, {animate: true, direction: 'left'});
  }
}
