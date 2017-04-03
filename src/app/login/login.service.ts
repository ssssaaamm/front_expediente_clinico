import { Injectable } from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable"

@Injectable()
export class LoginService {

  //url
  public url="https://192.168.1.4/badDemo/web/app_dev.php";
  
  //injecto la dep http
  constructor(private http:Http) { }

  signIn(user){
    //convertir el json en String
    let json=JSON.stringify(user);
    let parametros="json="+json;
    //cabecera que simula formualrio normal
    let headers=new Headers({'Content-type':'application/x-www-form-urlencoded'});

    //peticion
    return this.http.post(this.url+"/login",parametros,{headers:headers}).map(res=>res.json()) ;
    // return this.http.post(this.url+"/login",parametros,{headers:headers}).map( (response: Response) => {let user=response.json();});
  }
}
