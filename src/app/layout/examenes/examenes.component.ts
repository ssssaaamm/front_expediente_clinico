import { Component, OnInit } from '@angular/core';
import { ExamenesService } from "app/services/examenes.service";
import { TiposExamenService } from "app/services/tipos-examen.service";
import { LoginService } from "app/services/login.service";
import { TipoExamen } from "app/models/tipo_examen";
import { Examen } from "app/models/examen";

@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrls: ['./examenes.component.scss'],
  providers: [ExamenesService, LoginService, TiposExamenService]

  
})
export class ExamenesComponent implements OnInit {
  public examenes : Array<Examen>;
  public tipos_examen : Array<TipoExamen>;

  constructor(private LoginService: LoginService, private examenesService: ExamenesService, private tiposExamenService: TiposExamenService) { }

  

  ngOnInit() {

    //obtiene los tipos de examenes
    this.tiposExamenService.list()
    .map((tipos: Array<any>)=>{
        let result: Array<TipoExamen> = new Array<TipoExamen>();
        if(tipos){
            tipos.forEach((tipo)=>{
                result.push(new TipoExamen(
                    tipo.nombreTipoExamen,
                    tipo.codigoTipoExamen,
                    tipo.idTipoExamen
                ));
            });
        }
        return result;
    })
    .subscribe( res => this.tipos_examen = res);

    //obtiene los examens
     this.examenesService.list()
    .map((examenes: Array<any>)=>{
      let result: Array<Examen> = new Array<Examen>();
      if(examenes){
        examenes.forEach((examen)=>{
          let tipindx:number = this.indexOfTipo(new TipoExamen(examen.idTipoExamen.nombreTipoExamen,examen.idTipoExamen.codigoTipoExamen,examen.idTipoExamen.idTipoExamen),this.tipos_examen);
          result.push(new Examen(
            examen.codigoExamen,
            examen.nombreExamen,
            this.tipos_examen[tipindx],
            examen.costoExamen,
            examen.idExamen
          ));
        });
      }
      return result;
    })
    .subscribe( res => this.examenes = res);
  }

  private indexOfTipo(tipo:TipoExamen,tipos):number{
      let index=-1,i=0,tam=tipos.length;
      for(i;i<tam;i++){
          if(tipo.id==tipos[i].id && tipo.codigo==tipos[i].codigo && tipo.nombre==tipos[i].nombre){
              index=i;
          }
      }
      return index;
  }
}


