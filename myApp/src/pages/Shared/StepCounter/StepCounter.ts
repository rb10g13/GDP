import { NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { BeginTestService } from "../../Test/BeginTest/BeginTestService.service";

@Component({
  templateUrl: 'stepCounter.html',
  selector: 'app-step-counter'
})

export class StepCounter implements OnInit{

  firstActive: string = '';
  secondActive: string = '';
  thirdActive: string = '';
  fourthActive: string = '';

  ngOnInit() {
    var page = this.service.pageNumber;
    switch(page)
    {
      case 1:
        this.firstActive = 'active';
        break;
      case 2:
        this.secondActive = 'active';
        break;
      case 3:
        this.thirdActive = 'active';
        break;
      case 4:
        this.fourthActive = 'active';
        break;
      default: '';
    }
  }

  constructor(public navCtrl: NavController, public service: BeginTestService) {}
}
