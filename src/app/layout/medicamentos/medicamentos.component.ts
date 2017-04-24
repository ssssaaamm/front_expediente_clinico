import { Component, OnInit } from '@angular/core';
import { MedicamentosService } from "app/services/medicamentos.service";
import { TiposMedicamentoService } from "app/services/tipos-medicamento.service";
import { LoginService } from "app/services/login.service";
import { Medicamento } from "app/models/medicamento";
import { TipoMedicamento } from 'app/models/tipo_medicamento';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.scss'],
   providers: [MedicamentosService, LoginService, TiposMedicamentoService]
})
export class MedicamentosComponent implements OnInit {

public medicamentos : Array<Medicamento>;
public tipos_medicamento : Array<TipoMedicamento>;

  constructor(private LoginService: LoginService, private medicamentosService: MedicamentosService, private tiposMedicamentoService: TiposMedicamentoService) { }

  ngOnInit() {

    //obtiene los tipos de medicamentos
    this.tiposMedicamentoService.list()
    .map((tipos: Array<any>)=>{
        let result: Array<TipoMedicamento> = new Array<TipoMedicamento>();
        if(tipos){
            tipos.forEach((tipo)=>{
                result.push(new TipoMedicamento(
                    tipo.presentacion,
                    tipo.idTipoMedicamento
                ));
            });
        }
        return result;
    })
    .subscribe( res => this.tipos_medicamento = res);

    //obtiene los medicamentos
     this.medicamentosService.list()
    .map((medicamentos: Array<any>)=>{
      let result: Array<Medicamento> = new Array<Medicamento>();
      if(medicamentos){
        medicamentos.forEach((medicamento)=>{
          let tipindx:number = this.indexOfTipo(new TipoMedicamento(medicamento.idTipoMedicamento.presentacion, medicamento.idTipoMedicamento.idTipoMedicamento),this.tipos_medicamento);
          result.push(new Medicamento(
            medicamento.codigoMedicamento,
            medicamento.nombreMedicamento,
            this.tipos_medicamento[tipindx],
            medicamento.costoMedicamento,
            medicamento.idMedicamento)
            );
        });
      }
      return result;
    })
    .subscribe( res => this.medicamentos = res);
  }

  private indexOfTipo(tipo:TipoMedicamento,tipos):number{
    let index=-1,i=0,tam=tipos.length;
    for(i;i<tam;i++){
        if(tipo.id==tipos[i].id && tipo.presentacion==tipos[i].presentacion){
            index=i;
        }
    }
    return index;
  }
}


