import { Injectable } from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";

import { LoginService } from './login.service';
import { Cirugia } from '../models/cirugia';

@Injectable()
export class CirugiasService {

  private url="https://bad115.herokuapp.com";
  private resource: string ;
  private action: string ;
  private headers: Headers;
  public lista: Array<Cirugia> = new Array<Cirugia>();


  private token: string;

  constructor(private loginService: LoginService, private http: Http) {
    this.resource = "/cirugias";
    this.headers = new Headers({'Content-type':'application/x-www-form-urlencoded'});
    this.token = this.loginService.getToken();
  }

  list(){
    this.action = "/list";
    let parametros="token="+this.token;

    return this.http.post(this.url+this.resource+this.action,parametros,{headers:this.headers})
    .map(
      (res) => { 
        return res.json(); 
    });

  }

  add(cirugia:Cirugia){
    this.action = "/add";
    let parametros="token="+this.token;
    parametros = parametros + "&json="+JSON.stringify(cirugia);
    console.log("parametros: "+parametros);

    //peticion
    return this.http.post(this.url+this.resource+this.action,parametros,{headers:this.headers}).map(res=>res.json()) ; 
  }

  edit(cirugia:Cirugia){
    this.action = "/edit";
    let parametros="token="+this.token;
    parametros = parametros + "&json="+JSON.stringify(cirugia);

    //peticion
    return this.http.post(this.url+this.resource+this.action,parametros,{headers:this.headers}).map(res=>res.json()) ; 
  }

  del(cirugia:Cirugia){
    this.action = "/del";
    let parametros="token="+this.token;
    parametros = parametros + "&json="+JSON.stringify(cirugia);

    //peticion
    return this.http.post(this.url+this.resource+this.action,parametros,{headers:this.headers}).map(res=>res.json()) ; 
  }
detail(cirugia:any){
  this.action = "/realizadas";
    let parametros="token="+this.token;
    parametros = parametros + "&json="+JSON.stringify(cirugia);

    //peticion
    return this.http.post(this.url+this.resource+this.action,parametros,{headers:this.headers}).map(res=>res.json()) ;
}

listExpediente(expe:any){
  this.action = "/listExpediente";
    let parametros="token="+this.token;
    parametros = parametros + "&json="+JSON.stringify(expe);
    //peticion
    return this.http.post(this.url+this.resource+this.action,parametros,{headers:this.headers}).map(res=>res.json()) ;

}

}
