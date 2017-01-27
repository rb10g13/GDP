import { NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { SuccessPanel } from "../Results/Success/SuccessPanel";
import { ErrorPanel } from "../Results/Failure/ErrorPanel";
import { RecordedPanel } from "../Results/Recorded/RecordedPanel"
import { BeginTestService } from "../BeginTest/BeginTestService.service";
import { NetworkService } from "../../Shared/NetworkService";
import { ImplantIdService } from "../../Shared/ImplantIdService";
import { BeginTest } from "../../Test/BeginTest/BeginTest";

@Component({
  templateUrl: 'progress-page.html'
})

export class ProgressPanel implements OnInit{

  initialRecording: boolean;

  ngOnInit() {
    this.service.pageNumber = 3;
  }

  constructor(
      public navCtrl: NavController,
      public service: BeginTestService,
      public networkService: NetworkService,
      private implantService: ImplantIdService
    ) {

    this.networkService.recordingExists(this.implantService.getId())
      .subscribe(
        data => {
          this.initialRecording = false;
        },
        error => {
          this.initialRecording = true;
        }
      );

    this.performTest();
  }

  performTest() {
    var recording = this.testImplant();

    if(this.initialRecording){
      this.networkService.storeInitialRecording({recording: recording, implant_id: this.implantService.getId()}).subscribe(
        data => {this.proceedToRecordedPanel();},
        error => {this.proceedToBeginPanel();});
    }
    else {
      this.networkService.evaluateRecording({recording: recording, implant_id: this.implantService.getId()}).subscribe(
        data => {this.proceedToSuccessPanel();},
        error => {this.proceedToFailurePanel();});
    }
  }

  testImplant() {
    return [1,2,3,4];
  }


  proceedToSuccessPanel() {
    this.navCtrl.setRoot(SuccessPanel, {}, {animate: true, direction: 'left'});
  }
  proceedToFailurePanel() {
    this.navCtrl.setRoot(ErrorPanel, {}, {animate: true, direction: 'left'});
  }
  proceedToRecordedPanel() {
    this.navCtrl.setRoot(RecordedPanel, {}, {animate: true, direction: 'left'});
  }
  proceedToBeginPanel() {
    this.navCtrl.setRoot(BeginTest, {}, {animate: true, direction: 'right'});
  }
}
