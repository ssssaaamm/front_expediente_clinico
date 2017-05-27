import { Injectable } from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";



@Injectable()
export class PaisesService {

 private url="http://ws.postcoder.com/pcw/PCW45-12345-12345-1234X/country?format=json";
  private headers: Headers;

   constructor(private http: Http) {
    this.headers = new Headers({'Content-type':'application/x-www-form-urlencoded'});

}

    list(){
        return this.http.get(this.url,{headers:this.headers})
        .map(
          (res) => { 
            return res.json(); 
        });
  }
}
