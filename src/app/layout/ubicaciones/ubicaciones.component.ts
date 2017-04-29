import { Component, OnInit } from '@angular/core';
import { UbicacionesService } from "app/services/ubicaciones.service";
import{TiposUbicacionService} from "app/services/tipos-ubicacion.service";
import { LoginService } from "app/services/login.service";
import { TipoUbicacion } from "app/models/tipo_ubicacion";
import { Ubicacion } from "app/models/ubicacion";

@Component({
  selector: 'app-ubicaciones',
  templateUrl: './ubicaciones.component.html',
  styleUrls: ['./ubicaciones.component.scss'],
  providers: [UbicacionesService, LoginService, TiposUbicacionService]
  
})
export class UbicacionesComponent implements OnInit {
  public ubicaciones : Array<Ubicacion>;
  public tipos_ubicacion : Array<TipoUbicacion>;

  constructor(private LoginService: LoginService, private ubicacionesService: UbicacionesService, private tiposUbicacionService: TiposUbicacionService) { }

  

  ngOnInit() {

    //obtiene los tipos de ubicaciones
    this.tiposUbicacionService.list()
    .map((tipos: Array<any>)=>{
        let result: Array<TipoUbicacion> = new Array<TipoUbicacion>();
        if(tipos){
            tipos.forEach((tipo)=>{
                result.push(new TipoUbicacion(
                    tipo.nombreTipoUbicacion,
                    tipo.idTipoUbicacion
                ));
            });
        }
        return result;
    })
    .subscribe( res => this.tipos_ubicacion = res);

    //obtiene los ubicacions
     this.ubicacionesService.list()
    .map((ubicaciones: Array<any>)=>{
      let result: Array<Ubicacion> = new Array<Ubicacion>();
      if(ubicaciones){
        ubicaciones.forEach((ubicacion)=>{
          let tipindx:number = this.indexOfTipo(new TipoUbicacion(ubicacion.idTipoUbicacion.nombreTipoUbicacion,ubicacion.idTipoUbicacion.idTipoUbicacion),this.tipos_ubicacion);
          result.push(new Ubicacion(
            ubicacion.codigoUbicacion,
            ubicacion.nombreUbicacion,
            ubicacion.nivel,
            ubicacion.numero,
            this.tipos_ubicacion[tipindx],
            ubicacion.idUbicacion
          ));
        });
      }
      return result;
    })
    .subscribe( res => this.ubicaciones = res);
  }

  private indexOfTipo(tipo:TipoUbicacion,tipos):number{
      let index=-1,i=0,tam=tipos.length;
      for(i;i<tam;i++){
          if(tipo.id==tipos[i].id  && tipo.nombre==tipos[i].nombre){
              index=i;
          }
      }
      return index;
  }
}


