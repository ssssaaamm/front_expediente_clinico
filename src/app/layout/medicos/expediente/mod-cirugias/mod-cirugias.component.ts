import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Cirugia } from "app/models/cirugia";
import { Especialidad } from "app/models/especialidad";
import { LoginService } from "app/services/login.service";
import { CirugiasService } from "app/services/cirugias.service";
import { EspecialidadesService } from "app/services/especialidades.service";

@Component({
  selector: 'app-mod-cirugias',
  templateUrl: './mod-cirugias.component.html',
  styleUrls: ['./mod-cirugias.component.scss'],
    providers: [CirugiasService, LoginService, EspecialidadesService]
})
export class ModCirugiasComponent implements OnInit {
@Input() cita: any;
public cirugiasHechas : Array<any>;
   public cirugias: Array<Cirugia>=new Array<Cirugia>();
  public especialidades: Array<Especialidad>=new Array<Especialidad>();

  constructor(private loginService: LoginService, private cirugiasService: CirugiasService, private especialidadesService: EspecialidadesService) { 

  }

  ngOnInit() {
     let identidad = JSON.parse(localStorage.getItem("identity"));
    console.log("ENVIANDO IDENTIDAD: " + JSON.stringify(identidad));
    console.log("IDExpediente-----"+ JSON.stringify(this.cita.expediente.id));
    this.cirugiasService.listExpediente({"id":this.cita.expediente.id}).subscribe(
        response=>{
            console.log(response);
            this.cirugiasHechas=response;

        }, 
        error=>{
                if(error!=null) {
                    console.log("Error al enviar la peticion: "+error);
                }
        }
    );

    //obtenemos las especialidades
    this.especialidadesService.list()
    .map((especialidades: Array<any>)=>{
        let result: Array<Especialidad> = new Array<Especialidad>();
        if(especialidades){
            especialidades.forEach((especialidad)=>{
                result.push(new Especialidad(
                    especialidad.codigoEspecialidad,
                    especialidad.nombreEspecialidad,
                    especialidad.honorarios,
                    especialidad.idEspecialidad
                ));
            });
        }
        return result;
    })
    .subscribe( res => this.especialidades = res);


    //obtenemos las cirugias
    this.cirugiasService.list()
    .map((cirugias: Array<any>)=>{
      let result: Array<Cirugia> = new Array<Cirugia>();
      if(cirugias){
        cirugias.forEach((cirugia)=>{
          let tipindx:number = this.indexOfEspecialidad(new Especialidad(cirugia.idEspecialidad.codigoEspecialidad,cirugia.idEspecialidad.nombreEspecialidad,cirugia.idEspecialidad.honorarios,cirugia.idEspecialidad.idEspecialidad),this.especialidades);
          result.push(new Cirugia(
            cirugia.codigoCirugia,
            cirugia.nombreCirugia,
            cirugia.costoCirugia,
            this.especialidades[tipindx],
            cirugia.idCirugia
          ));
        });
      }
      return result;
    })
    .subscribe( res => this.cirugias = res);
  }


  private indexOfEspecialidad(especialidad:Especialidad, especialidades:Array<Especialidad>):number{
    let index=-1,i=0,tam=especialidades.length;
    for(i;i<tam;i++){
        if(especialidad.id==especialidades[i].id && especialidad.codigo==especialidades[i].codigo && especialidad.nombre==especialidades[i].nombre){
            index=i;
        }
    }
    return index;
  }

}
