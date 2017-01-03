import {NavController, AlertController} from 'ionic-angular';
import {Component, OnInit} from '@angular/core';
import {BeginTestService} from "../Test/BeginTest/BeginTestService.service";
import {ImplantSetUpPanel} from "../HardwareSetUp/ImplantSetUp/ImplantSetUpPanel";
import {ConnectivityService} from "../Shared/ConnectivityService";
import * as $ from "jquery";

declare var navigator: any;
declare var Connection: any;

@Component({
  templateUrl: 'home-page.html',
})

export class HomePage implements OnInit{

  buttonName:String = "Next";


  ngOnInit() {
    this.service.pageNumber = 1;
  }

  checkConnection() {
    let alert = this.alertCtrl.create({
      title: "Connection Status",
      subTitle: 'Please ensure your device is connected to the internet before you proceed',
      buttons: ["OK"]
    });
    if(this.connectionService.isOnline()) {
      //this.proceedToTest();
      this.runPythonScript();
    }
    else {
      alert.present();
    }

}

  constructor(public navCtrl: NavController,
              public service: BeginTestService,
              private alertCtrl: AlertController,
              private connectionService: ConnectivityService) {

  }

  proceedToTest() {
    this.navCtrl.setRoot(ImplantSetUpPanel, {}, {animate: true, direction: 'left'});
  }

  runPythonScript() {
    $.ajax({
      url: "test.py",
      cache: false,
      success: function(html){
        console.log(html);
      }
    });
  }
}
