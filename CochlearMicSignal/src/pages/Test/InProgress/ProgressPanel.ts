import { NavController } from 'ionic-angular';
import {Component} from '@angular/core';
import {SuccessPanel} from "../Results/Success/SuccessPanel";
import {ErrorPanel} from "../Results/Failure/ErrorPanel";

@Component({
  templateUrl: 'progress-page.html'
})

export class ProgressPanel {

  constructor(public navCtrl: NavController) {

  }

  proceedToSuccessPanel() {
      //depending on the result, we will root the Success or Failure component
    this.navCtrl.setRoot(SuccessPanel, {}, {animate: true, direction: 'left'});
  }

  proceedToFailurePanel() {
    //depending on the result, we will root the Success or Failure component
    this.navCtrl.setRoot(ErrorPanel, {}, {animate: true, direction: 'left'});
  }

}
