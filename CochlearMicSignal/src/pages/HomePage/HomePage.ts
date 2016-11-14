import {NavController} from 'ionic-angular';
import {Component, OnInit} from '@angular/core';
import {BeginTestService} from "../Test/BeginTest/BeginTestService.service";

@Component({
  templateUrl: 'home-page.html',
})

export class HomePage implements OnInit{

  ngOnInit() {
    this.service.pageNumber = 1;
  }

  constructor(public navCtrl: NavController, public service: BeginTestService) {

  }

}
