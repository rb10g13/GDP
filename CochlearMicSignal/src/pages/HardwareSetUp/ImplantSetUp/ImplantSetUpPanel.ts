import { NavController } from 'ionic-angular';
import {Component, OnInit} from '@angular/core';
import {BeginTest} from "../../Test/BeginTest/BeginTest";

@Component({
  templateUrl: 'implant-page.html'
})

export class ImplantSetUpPanel {

  buttonName:String = "stop loading";

      constructor(public nav: NavController) {

  }

  stopLoading() {
    this.nav.setRoot(BeginTest, {}, {animate: true, direction: 'left'});
  }
}
