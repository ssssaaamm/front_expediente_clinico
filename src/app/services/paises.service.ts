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
    let token=this.loginService.getToken();
    let url="https://bad115.herokuapp.com/paises/list?token="+token;
    return this.http.get(url)
    .map(
      (res) => { 
        return res.json(); 
    });
  }
   listRegions2(pais:any){
    let token=this.loginService.getToken();
    let url="https://bad115.herokuapp.com/paises/estadosPais?token="+token+"&json="+JSON.stringify(pais);
    return this.http.get(url)
    .map(
      (res) => { 
        return res.json(); 
    });
  }

  listCities2(region:any){
    let token=this.loginService.getToken();
    let url="https://bad115.herokuapp.com/paises/ciudadesEstado?token="+token+"&json="+JSON.stringify(region);
    return this.http.get(url)
    .map(
      (res) => { 
        return res.json(); 
    });
  }


}
