import { Injectable } from '@angular/core';

@Injectable()
export class ImplantIdService {

  implant_number: number;
  implant_ear: string;

  constructor(){}

  getId() {
    return {number: this.implant_number, ear: this.implant_ear}
  }

  setId(implant_number: number, implant_ear: string) {
    this.implant_number = implant_number;
    this.implant_ear = implant_ear;
  }
}
