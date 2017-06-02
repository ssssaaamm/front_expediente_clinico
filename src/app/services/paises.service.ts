import { Injectable } from '@angular/core';
import {Http,Response,Headers, Jsonp} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";

@Injectable()
export class PaisesService {

  private headers: Headers;

  constructor(private http: Http, private jsonp: Jsonp) {
    this.headers = new Headers({'Content-type':'application/x-www-form-urlencoded','Access-Control-Allow-Origin':'*'});
  }

  listCountries(){
    let url="http://battuta.medunes.net/api/country/all/?key=6e787ac21ac5ee2ce744e7f395e4dcd2";
    let call_back="&callback=JSONP_CALLBACK";
    return this.jsonp.request(url+call_back,this.headers)
    .map(
      (res) => { 
        return res.json(); 
    });
  }

  listRegions(country:string){
    let url="http://battuta.medunes.net/api/region/"+country+"/all/?key=6e787ac21ac5ee2ce744e7f395e4dcd2";
    let call_back="&callback=JSONP_CALLBACK";
    return this.jsonp.request(url+call_back,this.headers)
    .map(
      (res) => { 
        return res.json(); 
    });
  }

  listCities(country:string,region:string){
    let url="http://battuta.medunes.net/api/city/"+country+"/search/?region="+region+"&key=6e787ac21ac5ee2ce744e7f395e4dcd2";
    let call_back="&callback=JSONP_CALLBACK";
    return this.jsonp.request(url+call_back,this.headers)
    .map(
      (res) => { 
        return res.json(); 
    });
  }

}
