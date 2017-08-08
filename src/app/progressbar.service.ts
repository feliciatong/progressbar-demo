import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProgressbarService {

  constructor(private http: Http) { }

  getBars(): any {
    return this.http.get("http://pb-api.herokuapp.com/bars")
      .map(res => res.json());
  }
}
