import {NavController} from 'ionic-angular';
import {Component, OnInit} from '@angular/core';
import {BeginTestService} from "../Test/BeginTest/BeginTestService.service";
import {ImplantSetUpPanel} from "../HardwareSetUp/ImplantSetUp/ImplantSetUpPanel";

@Component({
  templateUrl: 'home-page.html',
})

export class HomePage implements OnInit{

  buttonName:String = "Next";

  labelClick(label) {
      document.querySelector('.'+label+'ToggleButton').classList.toggle('active');

      document.querySelector('.'+(label === 'right' ? 'left' : 'right')+'ToggleButton').classList.remove('active');
  }

  ngOnInit() {
    this.service.pageNumber = 1;
  }

  constructor(public navCtrl: NavController, public service: BeginTestService) {

  }

  proceedToTest() {
    //a function to check if the device is connected
    this.navCtrl.setRoot(ImplantSetUpPanel, {}, {animate: true, direction: 'left'});
  }
}
