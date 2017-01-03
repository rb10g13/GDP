import { NavController } from 'ionic-angular';
import {Component, OnInit} from '@angular/core';
import {BeginTest} from "../../Test/BeginTest/BeginTest";
import {BeginTestService} from "../../Test/BeginTest/BeginTestService.service";

@Component({
  templateUrl: 'implant-page.html'
})

export class ImplantSetUpPanel implements OnInit{

  buttonName:String = "Next";

  ngOnInit() {
    this.service.pageNumber = 2;
  }

  constructor(public nav: NavController, public service: BeginTestService) {

  }

  stopLoading() {
    this.nav.setRoot(BeginTest, {}, {animate: true, direction: 'left'});
  }
}
