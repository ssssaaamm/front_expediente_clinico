import { Component, OnInit } from '@angular/core';
import { Especialidad } from '../../models/especialidad';
import { LoginService } from '../../services/login.service';
import { EspecialidadesService } from '../../services/especialidades.service';

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.scss'],
  providers: [EspecialidadesService, LoginService]
})
export class EspecialidadesComponent implements OnInit {

  public especialidades: Array<Especialidad>;

  constructor(private loginService: LoginService, private especialidadesService: EspecialidadesService) { 

  }

  ngOnInit() {
    // this.especialidadesService.list().subscribe(
    //   response=>{
    //     //precargamos el array de objetos
    //     this.especialidades.push(response);
    //   },
    //   error=>{
    //     if(error!=null) {
    //         console.log("Error al enviar la peticion: "+error);
    //     }
    //   }
    // );
    this.especialidades=this.especialidadesService.list();
    console.log(this.especialidades);
  }

//   ​Object.observe(arr, function(changes) {
//     console.log("The array changed. Changes:", changes);
// });

  onAdd(especialidad:Especialidad){
    this.especialidades.push(especialidad);
  }

  onEdit(especialidad:Especialidad){

  }

  onDelete(especialidad:Especialidad){

  }

}
