import { Component, OnInit } from '@angular/core';
import { Cirugia } from '../../models/cirugia';
import { LoginService } from '../../services/login.service';
import { CirugiasService } from '../../services/cirugias.service';

@Component({
  selector: 'app-cirugias',
  templateUrl: './cirugias.component.html',
  styleUrls: ['./cirugias.component.scss'],
  providers: [CirugiasService, LoginService]
})
export class CirugiasComponent implements OnInit {

  public cirugias: Array<Cirugia>=new Array<Cirugia>();

  constructor(private loginService: LoginService, private cirugiasService: CirugiasService) { 

  }

  ngOnInit() {
    this.cirugiasService.list()
    .map((cirugias: Array<any>)=>{
      let result: Array<Cirugia> = new Array<Cirugia>();
      if(cirugias){
        cirugias.forEach((cirugia)=>{
          result.push(new Cirugia(cirugia.codigo_cirugia,cirugia.nombre_cirugia,cirugia.costo_cirugia,cirugia.id_cirugia));
        });
      }
      return result;
    })
    .subscribe( res => this.cirugias = res);
  }

}
