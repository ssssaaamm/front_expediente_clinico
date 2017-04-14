import { Component, OnInit } from '@angular/core';
import { MedicamentosService } from "app/services/medicamentos.service";
import { LoginService } from "app/services/login.service";
import { Medicamento } from "app/models/medicamento";

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.scss'],
   providers: [MedicamentosService, LoginService]
})
export class MedicamentosComponent implements OnInit {

public medicamentos : Array<Medicamento>;

  constructor(private LoginService: LoginService, private medicamentosService: MedicamentosService) { }

  ngOnInit() {
     this.medicamentosService.list()
    .map((medicamentos: Array<any>)=>{
      let result: Array<Medicamento> = new Array<Medicamento>();
      if(medicamentos){
        medicamentos.forEach((medicamento)=>{
          result.push(new Medicamento(medicamento.codigo,medicamento.nombre,medicamento.id));
        });
      }
      return result;
    })
    .subscribe( res => this.medicamentos = res);
    
  let vec:Array<Medicamento> = [
    new Medicamento("003","espe1",200)
  ]; 
  this.medicamentos=vec;
  }
  }


