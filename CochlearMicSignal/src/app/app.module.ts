import { NgModule } from '@angular/core';
import {IonicApp, IonicModule} from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/HomePage/HomePage';
import { Header } from '../pages/Shared/Header/Header';
import {Footer} from "../pages/Shared/Footer/Footer";
import {NextButton} from "../pages/Shared/Button/NextButton";
import {BeginTest} from "../pages/Test/BeginTest/BeginTest";
import {BeginTestService} from "../pages/Test/BeginTest/BeginTestService.service";
import {ProgressPanel} from "../pages/Test/InProgress/ProgressPanel";
import {SuccessPanel} from "../pages/Test/Results/Success/SuccessPanel"
import {ErrorPanel} from "../pages/Test/Results/Failure/ErrorPanel";
import {ImplantSetUpPanel} from "../pages/HardwareSetUp/ImplantSetUp/ImplantSetUpPanel";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Header,
    Footer,
    NextButton,
    BeginTest,
    ProgressPanel,
    SuccessPanel,
    ErrorPanel,
    ImplantSetUpPanel
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
    NextButton,
    BeginTest,
    ProgressPanel,
    SuccessPanel,
    ErrorPanel,
    ImplantSetUpPanel
  ],
  providers: [BeginTestService]
})
export class AppModule {}
