import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { HomePage } from '../pages/HomePage/HomePage';
import { Header } from '../pages/Shared/Header/Header';
import { StepCounter } from "../pages/Shared/StepCounter/StepCounter";
import { NextButton } from "../pages/Shared/Button/NextButton";
import { BeginTest } from "../pages/Test/BeginTest/BeginTest";
import { BeginTestService } from "../pages/Test/BeginTest/BeginTestService.service";
import { ProgressPanel } from "../pages/Test/InProgress/ProgressPanel";
import { SuccessPanel } from "../pages/Test/Results/Success/SuccessPanel"
import { ErrorPanel } from "../pages/Test/Results/Failure/ErrorPanel";
import { ImplantSetUpPanel } from "../pages/HardwareSetUp/ImplantSetUp/ImplantSetUpPanel";
import { MobileSetUpPanel } from "../pages/HardwareSetUp/MobileSetUp/MobileSetUpPanel";


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
