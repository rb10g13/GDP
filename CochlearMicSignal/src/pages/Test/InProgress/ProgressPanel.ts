import { NavController } from 'ionic-angular';
import {Component, OnInit} from '@angular/core';
import {SuccessPanel} from "../Results/Success/SuccessPanel";
import {ErrorPanel} from "../Results/Failure/ErrorPanel";
import {BeginTestService} from "../BeginTest/BeginTestService.service";
import {NetworkService} from "../../Shared/NetworkService";

@Component({
  templateUrl: 'progress-page.html'
})

export class ProgressPanel implements OnInit{

  ngOnInit() {
    this.service.pageNumber = 3;
  }


  constructor(public navCtrl: NavController, public service: BeginTestService, public networkService: NetworkService) {

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
