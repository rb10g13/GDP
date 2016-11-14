import {NavController} from 'ionic-angular';
import {Component} from '@angular/core';
import {Header} from '../Shared/Header/Header';
import {Footer} from '../Shared/Footer/Footer';

@Component({
  templateUrl: 'home-page.html',
})

export class HomePage {

  constructor(public navCtrl: NavController) {

  }
}
