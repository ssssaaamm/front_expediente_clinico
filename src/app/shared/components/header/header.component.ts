import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../../services/login.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [LoginService]
})
export class HeaderComponent implements OnInit {
    public identity;
    public token;

    constructor(private loginService:LoginService) { }
    
    ngOnInit() {

        this.identity = this.loginService.getIdentity();
        this.token = this.loginService.getToken();

    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('push-right');
    }
}
