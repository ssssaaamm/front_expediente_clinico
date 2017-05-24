import { Injectable } from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";

import { LoginService } from './login.service';
import { Usuario } from '../models/usuario';

@Injectable()
export class UsuariosService {private url="https://bad115.herokuapp.com";
  private resource: string ;
  private action: string ;
  private headers: Headers;
  public lista: Array<Usuario> = new Array<Usuario>();


  private token: string;

  constructor(private loginService: LoginService, private http: Http) {
    this.resource = "/usuarios";
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

  add(usuario:Usuario){
    this.action = "/add";
    let parametros="token="+this.token;
    parametros = parametros + "&json="+JSON.stringify(usuario);
    console.log("parametros: "+parametros);

    //peticion
    return this.http.post(this.url+this.resource+this.action,parametros,{headers:this.headers}).map(res=>res.json()) ; 
  }

  edit(usuario:Usuario){
    this.action = "/edit";
    let parametros="token="+this.token;
    parametros = parametros + "&json="+JSON.stringify(usuario);
    
    //peticion
    return this.http.post(this.url+this.resource+this.action,parametros,{headers:this.headers}).map(res=>res.json()) ; 
  }

  del(usuario:Usuario){
    this.action = "/del";
    let parametros="token="+this.token;
    parametros = parametros + "&json="+JSON.stringify(usuario);

    //peticion
    return this.http.post(this.url+this.resource+this.action,parametros,{headers:this.headers}).map(res=>res.json()) ; 
  }

}
