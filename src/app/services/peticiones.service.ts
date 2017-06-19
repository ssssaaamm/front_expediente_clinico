import { Injectable } from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";

import { LoginService } from './login.service';
@Injectable()
export class PeticionesService {

  private url="https://bad115.herokuapp.com";
  private resource: string ;
  private action: string ;
  private headers: Headers;
 // public lista: Array<Consulta> = new Array<Consulta>();


  private token: string;

  constructor(private loginService: LoginService, private http: Http) {
    this.resource = "/peticiones";
    this.headers = new Headers({'Content-type':'application/x-www-form-urlencoded'});
    this.token = this.loginService.getToken();
  }

  newConsulta(json:any){
    this.action = "/newConsulta";
    let parametros="token="+this.token;
    parametros = parametros + "&json="+JSON.stringify(json);

    console.log(parametros);

    return this.http.post(this.url+this.resource+this.action,parametros,{headers:this.headers})
    .map(
      (res) => { 
        return res.json(); 
    });
  }

  medicosEspecialidad(especialidad:any){
    this.action = "/medicosEspecialidad";
    let parametros="token="+this.token;
    parametros = parametros + "&json="+JSON.stringify(especialidad);

    console.log(parametros);

    return this.http.post(this.url+this.resource+this.action,parametros,{headers:this.headers})
    .map(
      (res) => { 
        return res.json(); 
    });
  }

}
