import { NavController, AlertController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { BeginTestService } from "../Test/BeginTest/BeginTestService.service";
import { ImplantSetUpPanel } from "../HardwareSetUp/ImplantSetUp/ImplantSetUpPanel";
import { ConnectivityService } from "../Shared/ConnectivityService";
import { ImplantIdService } from "../Shared/ImplantIdService";

@Component({
  templateUrl: 'home-page.html',
})

export class HomePage implements OnInit{

  buttonName:String = "Next";
  implant_number:number;
  implant_ear:string;

  labelClick(label) {
      document.querySelector('.' + label + 'ToggleButton').classList.toggle('active');

      document.querySelector('.' + (label === 'right' ? 'left' : 'right') + 'ToggleButton').classList.remove('active');

      if(document.querySelector('.rightToggleButton').classList.contains('active'))
        this.implant_ear = 'R';
      else if(document.querySelector('.leftToggleButton').classList.contains('active'))
        this.implant_ear = 'L';
      else
        this.implant_ear = null;
  }

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
      this.proceedToTest();
    }
    else {
      alert.present();
    }

}

  constructor(public navCtrl: NavController,
              public service: BeginTestService,
              private alertCtrl: AlertController,
              private connectionService: ConnectivityService,
              private implantService: ImplantIdService) {

  }

  proceedToTest() {
    if(this.implant_number && this.implant_ear){
      this.implantService.setId(this.implant_number, this.implant_ear);

      this.navCtrl.setRoot(ImplantSetUpPanel, {}, {animate: true, direction: 'left'});
    }
  }

  /*runPythonScript() {
    $.ajax({
      url: "test.py",
      cache: false,
      success: function(html){
        console.log(html);
      }
    });
  }*/
}
