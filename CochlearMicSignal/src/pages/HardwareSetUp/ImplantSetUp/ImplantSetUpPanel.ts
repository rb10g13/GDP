import { NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { MobileSetUpPanel } from "../MobileSetUp/MobileSetUpPanel";
import { BeginTestService } from "../../Test/BeginTest/BeginTestService.service";

@Component({
  templateUrl: 'implant-page.html'
})

export class ImplantSetUpPanel implements OnInit{

  buttonName:String = "next";

  ngOnInit() {
    this.service.pageNumber = 2;
  }

  constructor(public nav: NavController, public service: BeginTestService) {

  }

  nextPage() {
    this.nav.setRoot(MobileSetUpPanel, {}, {animate: true, direction: 'left'});
  }
}
