import {NavController} from 'ionic-angular';
import {Component} from '@angular/core';;
import {BeginTestService} from "../../Test/BeginTest/BeginTestService.service";
import {ImplantSetUpPanel} from "../../HardwareSetUp/ImplantSetUp/ImplantSetUpPanel";

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
    this.nav.setRoot(ImplantSetUpPanel, {}, {animate: true, direction: 'left'});
  }

}
