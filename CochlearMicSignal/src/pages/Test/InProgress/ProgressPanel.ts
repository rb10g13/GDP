import { NavController } from 'ionic-angular';
import {Component} from '@angular/core';
import {SuccessPanel} from "../Results/Success/SuccessPanel";

@Component({
  templateUrl: 'progress-page.html'
})

export class ProgressPanel {

  constructor(public navCtrl: NavController) {

  }

  processResults() {
      //depending on the result, we will root the Success or Failure component
    this.navCtrl.setRoot(SuccessPanel, {}, {animate: true, direction: 'left'});
  }

}
