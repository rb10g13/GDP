import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  templateUrl: 'header.html',
  selector: 'app-header'
})

export class Header {
  constructor(public navCtrl: NavController) {}
}
