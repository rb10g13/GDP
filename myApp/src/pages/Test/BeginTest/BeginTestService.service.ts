import {Injectable} from "@angular/core";
import { NavController } from 'ionic-angular';
import {BeginTest} from "./BeginTest";

@Injectable()
export class BeginTestService {

  buttonName:String = "Next";
  hiddenArrow:boolean = false;
  pageNumber:number;
  isActive: boolean;
}
