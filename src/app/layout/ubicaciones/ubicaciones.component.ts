import { Component, OnInit } from '@angular/core';
import { Ubicacion } from '../../models/ubicacion';
import { LoginService } from '../../services/login.service';
import { UbicacionesService } from '../../services/ubicaciones.service';

@Component({
  selector: 'app-ubicaciones',
  templateUrl: './ubicaciones.component.html',
  styleUrls: ['./ubicaciones.component.scss'],
  providers: [UbicacionesService, LoginService]
})
export class UbicacionesComponent implements OnInit {

  public ubicaciones: Array<Ubicacion> = new Array<Ubicacion>();

  constructor(private loginService: LoginService, private ubicacionesService: UbicacionesService) { 

  }

  ngOnInit() {
    this.ubicacionesService.list()
    .map((ubicaciones: Array<any>)=>{
      let result: Array<Ubicacion> = new Array<Ubicacion>();
      if(ubicaciones){
        ubicaciones.forEach((ubicacion)=>{
          result.push(new Ubicacion(ubicacion.codigo_ubicacion,ubicacion.nombre_ubicacion,ubicacion.nivel_ubicacion,ubicacion.numero_ubicacion,ubicacion.id_ubicacion));
        });
      }
      return result;
    })
    .subscribe( res => this.ubicaciones = res);
  }

}
