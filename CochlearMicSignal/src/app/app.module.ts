import { NgModule } from '@angular/core';
import {IonicApp, IonicModule} from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/HomePage/HomePage';
import { Header } from '../pages/Shared/Header/Header';
import {Footer} from "../pages/Shared/Footer/Footer";
import {NextButton} from "../pages/Shared/Button/NextButton";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Header,
    Footer,
    NextButton
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Header,
    Footer,
    NextButton
  ],
  providers: []
})
export class AppModule {}
