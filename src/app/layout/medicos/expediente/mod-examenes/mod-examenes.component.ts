import { Component, OnInit, Input } from '@angular/core';
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Examen } from "app/models/examen";
import { ExamenesService } from "app/services/examenes.service";
import { LoginService } from "app/services/login.service";
import { TiposExamenService } from "app/services/tipos-examen.service";
import { TipoExamen } from "app/models/tipo_examen";

@Component({
  selector: 'app-mod-examenes',
  templateUrl: './mod-examenes.component.html',
  styleUrls: ['./mod-examenes.component.scss'],
    providers: [ExamenesService, LoginService, TiposExamenService]

})
export class ModExamenesComponent implements OnInit {
@Input() cita: any;
public examenesHechos : Array<any>;


public examenes : Array<Examen>;
public tipos_examen : Array<TipoExamen>;

  constructor(private LoginService: LoginService, private examenesService: ExamenesService, private tiposExamenService: TiposExamenService) { }

  ngOnInit() {
    let identidad = JSON.parse(localStorage.getItem("identity"));
    console.log("ENVIANDO IDENTIDAD: " + JSON.stringify(identidad));
    console.log("IDExpediente-----"+ JSON.stringify(this.cita.expediente.id));

    this.examenesService.examenPaciente({"id":this.cita.expediente.id}).subscribe(
        response=>{
            console.log(response);
            this.examenesHechos=response;

        }, 
        error=>{
                if(error!=null) {
                    console.log("Error al enviar la peticion: "+error);
                }
        }
    );


    
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


