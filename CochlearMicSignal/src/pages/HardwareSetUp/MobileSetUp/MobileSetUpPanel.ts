import { NavController } from 'ionic-angular';
import {Component, OnInit} from '@angular/core';
import {BeginTest} from "../../Test/BeginTest/BeginTest";
import {BeginTestService} from "../../Test/BeginTest/BeginTestService.service";

@Component({
  templateUrl: 'mobile-page.html'
})

export class MobileSetUpPanel implements OnInit{

  buttonName:String = "next";

  ngOnInit() {
    this.service.pageNumber = 2;
  }

  constructor(public nav: NavController, public service: BeginTestService) {

  }

  nextPage() {
    this.nav.setRoot(BeginTest, {}, {animate: true, direction: 'left'});
  }
}
