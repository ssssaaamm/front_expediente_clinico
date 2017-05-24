import { Injectable } from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable"


import { LoginService } from './login.service';
import { MenuRol } from '../models/menu_rol';
import { Rol } from '../models/rol';

@Injectable()
export class MenusRolService {

  private url="https://bad115.herokuapp.com";
  private resource: string ;
  private action: string ;
  private headers: Headers;


  private token: string;

  constructor(private loginService: LoginService, private http: Http) {
    this.resource = "/menus_rol";
    this.headers = new Headers({'Content-type':'application/x-www-form-urlencoded'});
    this.token = this.loginService.getToken();
  }

  /*En este caso si es necesario pasarle un parametro al metodo list ya que solo queremos los menus_list para 
  un rol especifico*/
  list(rol: Rol){
    this.action = "/list";
    let parametros="token="+this.token;

    return this.http.post(this.url+this.resource+this.action,parametros,{headers:this.headers})
    .map(
      (res) => { 
        return res.json(); 
    });

  }

  // add(menu_rol:MenuRol){
  //   this.action = "/add";
  //   let parametros="token="+this.token;
  //   parametros = parametros + "&json="+JSON.stringify(menu_rol);
  //   console.log("parametros: "+parametros);

  //   //peticion
  //   return this.http.post(this.url+this.resource+this.action,parametros,{headers:this.headers}).map(res=>res.json()) ; 
  // }

  edit(menus_rol:Array<MenuRol>){
    this.action = "/edit";
    let parametros="token="+this.token;
    parametros = parametros + "&json="+JSON.stringify(menus_rol);

    //peticion
    return this.http.post(this.url+this.resource+this.action,parametros,{headers:this.headers}).map(res=>res.json()) ; 
  }

  // del(menu_rol:MenuRol){
  //   this.action = "/del";
  //   let parametros="token="+this.token;
  //   parametros = parametros + "&json="+JSON.stringify(menu_rol);

  //   //peticion
  //   return this.http.post(this.url+this.resource+this.action,parametros,{headers:this.headers}).map(res=>res.json()) ; 
  // }

}
