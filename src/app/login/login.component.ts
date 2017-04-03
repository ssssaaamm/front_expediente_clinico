import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
import {NgForm} from "@angular/forms";

//para poder hacer redireccion importamos router
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [LoginService]
})
export class LoginComponent implements OnInit {

    public user;
    returnUrl: string;
    loading = false;
    public errorMessage;
    
    constructor(private loginService:LoginService, private route: ActivatedRoute, private router: Router,) { }

    ngOnInit() {
        this.user={
            "email":"estoyenoninit@oninit.com",
            "password":"passwordoninit",
            "getHash":"true"
        };

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    }

    login(form:NgForm){
    
        console.log(this.user);

        this.loading = true;

        this.loginService.signIn(this.user).subscribe(
        response=>{
            //alert("Respuesta del Servidor :");
            console.log("Respuesta del servidor: "+JSON.stringify(response) );
            this.router.navigate([this.returnUrl]);
        },
        error=>{
          this.errorMessage=<any>error;
          //si hay error
          if(this.errorMessage!=null) {
            console.log("Error en la peticion: "+this.errorMessage);
            this.loading = false;
          }
        }
    );
  }

}
