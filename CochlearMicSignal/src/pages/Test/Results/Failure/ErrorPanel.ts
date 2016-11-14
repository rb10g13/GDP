import { NavController } from 'ionic-angular';
import {Component, OnInit} from '@angular/core';
import {BeginTestService} from "../../BeginTest/BeginTestService.service";
import {ProgressPanel} from "../../InProgress/ProgressPanel";

@Component({
  templateUrl: 'error-page.html'
})

export class ErrorPanel implements OnInit{

  buttonName:String = "Test Again"

  ngOnInit() {
    this.service.pageNumber = 4;
  }


  constructor(public navCtrl: NavController, private service: BeginTestService) {

  }

  testAgain() {
    this.navCtrl.setRoot(ProgressPanel, {}, {animate: true, direction: 'left'});
  }
}
