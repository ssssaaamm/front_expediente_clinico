import { Component, OnInit } from '@angular/core';
import { Procedimiento } from '../../models/procedimiento';
import { LoginService } from '../../services/login.service';
import { ProcedimientosService } from '../../services/procedimientos.service';
@Component({
  selector: 'app-procedimientos',
  templateUrl: './procedimientos.component.html',
  styleUrls: ['./procedimientos.component.scss'],
  providers: [ProcedimientosService, LoginService]
})
export class ProcedimientosComponent implements OnInit {
  public procedimientos: Array<Procedimiento>;
  constructor(private loginService: LoginService, private procedimientosService: ProcedimientosService) { }

  ngOnInit() {
    this.procedimientosService.list()
    .map((procedimientos: Array<any>)=>{
      let result: Array<Procedimiento> = new Array<Procedimiento>();
      if(procedimientos){
        procedimientos.forEach((procedimiento)=>{
          result.push(new Procedimiento(procedimiento.codigoProcedimiento,procedimiento.nombreProcedimiento,procedimiento.costoProcedimiento,procedimiento.idProcedimiento));
        });
      }
      return result;
    })
    .subscribe( res => this.procedimientos = res);
  }
  

}
