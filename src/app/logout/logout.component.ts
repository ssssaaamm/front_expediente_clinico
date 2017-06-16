import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  
  
  constructor(public router: Router) { }
    
    ngOnInit() {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
        localStorage.removeItem('menus_rol');
        this.router.navigate(['/login']);
    }

}
