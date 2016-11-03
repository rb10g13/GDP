import {NavController, Button} from 'ionic-angular';
import {Component, ViewChild, OnInit} from '@angular/core';
import {BeginTest} from '../../Test/BeginTest/BeginTest';
import {BeginTestService} from "../../Test/BeginTest/BeginTestService.service";
import {ProgressPanel} from "../../Test/InProgress/ProgressPanel";

@Component({
  templateUrl: 'next-button-page.html',
  selector: 'next-button'
})

export class NextButton implements OnInit{

  buttonName:String = null;
  hiddenArrow:boolean = false;

  constructor(public nav: NavController, public beginTestService: BeginTestService) {

  }

  ngOnInit() {
    this.buttonName = this.beginTestService.buttonName;
    this.hiddenArrow = this.beginTestService.hiddenArrow;
  }

  proceedToTest() {
    //a function to check if the device is connected
    this.nav.setRoot(BeginTest, {}, {animate: true, direction: 'left'});
  }

}
