import { Injectable } from '@angular/core';
import {Http,Response,Headers, Jsonp} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import { LoginService } from './login.service';


@Injectable()
export class PaisesService {

  private headers: Headers;

  constructor(private http: Http, private jsonp: Jsonp, private loginService:LoginService) {
    this.headers = new Headers({'Content-type':'application/x-www-form-urlencoded','Access-Control-Allow-Origin':'*'});
  }

  listCountries(){
    let url="http://battuta.medunes.net/api/country/all/?key=00000000000000000000000000000000";
    let call_back="&callback=JSONP_CALLBACK";
    return this.jsonp.request(url+call_back,this.headers)
    .map(
      (res) => { 
        return res.json(); 
    });
  }

  listRegions(country:string){
    let url="http://battuta.medunes.net/api/region/"+country+"/all/?key=00000000000000000000000000000000";
    let call_back="&callback=JSONP_CALLBACK";
    return this.jsonp.request(url+call_back,this.headers)
    .map(
      (res) => { 
        return res.json(); 
    });
  }

  listCities(country:string,region:string){
    let url="http://battuta.medunes.net/api/city/"+country+"/search/?region="+region+"&key=00000000000000000000000000000000";
    let call_back="&callback=JSONP_CALLBACK";
    return this.jsonp.request(url+call_back,this.headers)
    .map(
      (res) => { 
        return res.json(); 
    });
  }

  listCountries2(){
    let url="https://bad115.herokuapp.com/paises/list";
    // let call_back="&callback=JSONP_CALLBACK";
    // return this.jsonp.request(url+call_back,this.headers)
    // .map(
    //   (res) => { 
    //     return res.json(); 
    // });


    let parametros="token="+this.loginService.getToken();
    return this.http.post(url+parametros,{headers:this.headers})
    .map(
      (res) => { 
        return res.json(); 
    });

        
  }

}
