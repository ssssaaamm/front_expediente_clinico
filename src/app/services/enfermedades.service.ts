import { Injectable } from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";

import { LoginService } from './login.service';
import { Enfermedad } from '../models/enfermedad';
import { Paciente } from '../models/paciente';
import { Padre } from '../models/padre';

@Injectable()
export class EnfermedadesService {

  private url="https://bad115.herokuapp.com";
  private resource: string ;
  private action: string ;
  private headers: Headers;
  public lista: Array<Enfermedad> = new Array<Enfermedad>();


  private token: string;

  constructor(private loginService: LoginService, private http: Http) {
    this.resource = "/enfermedades";
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

  add(enfermedad:Enfermedad){
    this.action = "/add";
    let parametros="token="+this.token;
    parametros = parametros + "&json="+JSON.stringify(enfermedad);
    console.log("parametros: "+parametros);

    //peticion
    return this.http.post(this.url+this.resource+this.action,parametros,{headers:this.headers}).map(res=>res.json()) ; 
  }

  edit(enfermedad:Enfermedad){
    this.action = "/edit";
    let parametros="token="+this.token;
    parametros = parametros + "&json="+JSON.stringify(enfermedad);

    //peticion
    return this.http.post(this.url+this.resource+this.action,parametros,{headers:this.headers}).map(res=>res.json()) ; 
  }

  del(enfermedad:Enfermedad){
    this.action = "/del";
    let parametros="token="+this.token;
    parametros = parametros + "&json="+JSON.stringify(enfermedad);

    //peticion
    return this.http.post(this.url+this.resource+this.action,parametros,{headers:this.headers}).map(res=>res.json()) ; 
  }

  // enfermedadesPaciente(paciente:any){
  //   this.action = "/paciente";
  //   let parametros="token="+this.token;
  //   parametros = parametros + "&json="+JSON.stringify(paciente);
  //   console.log(parametros);

  //   //peticion
  //   return this.http.post(this.url+this.resource+this.action,parametros,{headers:this.headers}).map(res=>res.json()) ; 
  // }

  getPadecimientosPaciente(paciente:any){
    this.action = "/enfemedades";
    let parametros="token="+this.token;
    parametros = parametros + "&json="+JSON.stringify(paciente);
    //peticion
    return this.http.post(this.url+"/pacientes"+this.action,parametros,{headers:this.headers}).map(res=>res.json()) ; 
  }

  getPadecimientosPadre(padre:any){
    this.action = "/enfemedadesPadre";
    let parametros="token="+this.token;
    parametros = parametros + "&json="+JSON.stringify(padre);

    //peticion
    return this.http.post(this.url+"/pacientes"+this.action,parametros,{headers:this.headers}).map(res=>res.json()) ; 
  }

}
