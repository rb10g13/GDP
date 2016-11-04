import {NavController} from 'ionic-angular';
import {Component} from '@angular/core';
import {BeginTest} from '../../Test/BeginTest/BeginTest';
import {BeginTestService} from "../../Test/BeginTest/BeginTestService.service";

@Component({
  templateUrl: 'next-button-page.html',
  selector: 'next-button'
})

export class NextButton{

  buttonName:String = "Next";

  constructor(public nav: NavController, public beginTestService: BeginTestService) {

  }

  proceedToTest() {
    //a function to check if the device is connected
    this.nav.setRoot(BeginTest, {}, {animate: true, direction: 'left'});
  }

}
