import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

declare var Connection;

@Injectable()
export class NetworkService {

  constructor (private http: Http) {}

  // getHeroes (): Observable<Hero[]> {
  //   return this.http.get(this.heroesUrl)
  //                   .map(this.extractData)
  //                   .catch(this.handleError);
  // }
}
