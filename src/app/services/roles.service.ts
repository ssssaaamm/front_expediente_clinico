import { Injectable } from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable"


import { LoginService } from './login.service';
import { Rol } from '../models/rol';
import { MenuRol } from '../models/menu_rol';
import { Usuario } from "app/models/usuario";


@Injectable()
export class RolesService {

  private url="https://bad115.herokuapp.com";
  private resource: string ;
  private action: string ;
  private headers: Headers;


  private token: string;

  constructor(private loginService: LoginService, private http: Http) {
    this.resource = "/roles";
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

  add(rol:Rol){
    this.action = "/add";
    let parametros="token="+this.token;
    parametros = parametros + "&json="+JSON.stringify(rol);
    console.log("parametros: "+parametros);

    //peticion
    return this.http.post(this.url+this.resource+this.action,parametros,{headers:this.headers}).map(res=>res.json()) ; 
  }

  edit(rol:Rol){
    this.action = "/edit";
    let parametros="token="+this.token;
    parametros = parametros + "&json="+JSON.stringify(rol);

    //peticion
    return this.http.post(this.url+this.resource+this.action,parametros,{headers:this.headers}).map(res=>res.json()) ; 
  }

  del(rol:Rol){
    this.action = "/del";
    let parametros="token="+this.token;
    parametros = parametros + "&json="+JSON.stringify(rol);

    //peticion
    return this.http.post(this.url+this.resource+this.action,parametros,{headers:this.headers}).map(res=>res.json()) ; 
  }

  privilegiosList(rol:Rol){
    this.action = "/privilegios";
    let parametros="token="+this.token;
    parametros = parametros + "&json="+JSON.stringify(rol);

    //peticion
    return this.http.post(this.url+this.resource+this.action,parametros,{headers:this.headers}).map(res=>res.json()) ; 
  }

  getPrivilegiosUsuario(){
    this.action = "/privilegiosUser"; //<<----cambiara segun la url de los chicos
    this.token=this.token.slice(0,-1);
    this.token=this.token.substring(1);
    
    let parametros="token="+this.token;
    //parametros = parametros + "&json="+JSON.stringify(rol);
    console.log(parametros);
    //peticion
    return this.http.post(this.url+this.resource+this.action,parametros,{headers:this.headers}).map(res=>res.json()) ; 
  }

  privilegiosEdit(menus_rol:Array<MenuRol>){
    this.action = "/setPrivilegios";
    let parametros="token="+this.token;
    parametros = parametros + "&json="+JSON.stringify(menus_rol);
    console.log(parametros);

    //peticion
    return this.http.post(this.url+this.resource+this.action,parametros,{headers:this.headers}).map(res=>res.json()) ; 
  }
  getUsuarioRol(usuario:Usuario){
    this.action = "/usuarioRoles";
    let parametros = "token=" + this.token;
    //let temp:any  = new Object();
    //temp.usuario=usuario;
    parametros = parametros + "&json="+JSON.stringify(usuario);
    console.log(parametros);

    return this.http.post(this.url + this.resource + this.action, parametros, { headers: this.headers })
      .map(
      (res) => {
        return res.json();
      });
  }

}
