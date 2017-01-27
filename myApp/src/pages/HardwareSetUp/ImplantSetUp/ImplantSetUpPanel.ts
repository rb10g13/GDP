import { NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { BeginTestService } from "../../Test/BeginTest/BeginTestService.service";
import { BeginTest } from "../../Test/BeginTest/BeginTest";

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

  nextPage() {
    this.nav.setRoot(BeginTest, {}, {animate: true, direction: 'left'});
  }
}
