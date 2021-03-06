import { Injectable } from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable"


import { LoginService } from './login.service';
import { Menu } from '../models/menu';

@Injectable()
export class MenusService {

  private url="https://bad115.herokuapp.com";
  private resource: string ;
  private action: string ;
  private headers: Headers;


  private token: string;

  constructor(private loginService: LoginService, private http: Http) {
    this.resource = "/menus";
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

  // add(menu:Menu){
  //   this.action = "/add";
  //   let parametros="token="+this.token;
  //   parametros = parametros + "&json="+JSON.stringify(menu);
  //   console.log("parametros: "+parametros);

  //   //peticion
  //   return this.http.post(this.url+this.resource+this.action,parametros,{headers:this.headers}).map(res=>res.json()) ; 
  // }

  // edit(menu:Menu){
  //   this.action = "/edit";
  //   let parametros="token="+this.token;
  //   parametros = parametros + "&json="+JSON.stringify(menu);

  //   //peticion
  //   return this.http.post(this.url+this.resource+this.action,parametros,{headers:this.headers}).map(res=>res.json()) ; 
  // }

  // del(menu:Menu){
  //   this.action = "/del";
  //   let parametros="token="+this.token;
  //   parametros = parametros + "&json="+JSON.stringify(menu);

  //   //peticion
  //   return this.http.post(this.url+this.resource+this.action,parametros,{headers:this.headers}).map(res=>res.json()) ; 
  // }

}
