import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [LoginService]
})
export class AppComponent implements OnInit {
    

    constructor(public router: Router, private loginService: LoginService) { }

    ngOnInit() {
        let iden = localStorage.getItem('identity');
        if(iden == null){
            this.router.navigate(['/login']);
        } else{
            
            if(window.location.pathname == '/login'){
                this.router.navigate(['']);
            }
        }
    }

}
