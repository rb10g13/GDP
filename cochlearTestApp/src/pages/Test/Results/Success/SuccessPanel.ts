import { NavController } from 'ionic-angular';
import {Component, OnInit} from '@angular/core';
import {BeginTestService} from "../../BeginTest/BeginTestService.service";
import {NextButton} from "../../../Shared/Button/NextButton"

@Component({
  templateUrl: 'success-page.html'
})

export class SuccessPanel implements OnInit {

  buttonName:String = "Finish"

  constructor(public navCtrl: NavController, private beginTestService: BeginTestService) {

  }

  ngOnInit() {
    this.beginTestService.buttonName = this.buttonName;
    this.beginTestService.hiddenArrow = true;
  }

}
