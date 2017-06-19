import { Component, OnInit } from '@angular/core';
import { PaisesService } from 'app/services/paises.service';
import { Paciente } from "app/models/paciente";
import { Enfermedad } from "app/models/enfermedad";
import { Responsable } from "app/models/responsable";
import { Padre } from "app/models/padre";
import { EnfermedadesService } from 'app/services/enfermedades.service';
import { PacientesService } from 'app/services/pacientes.service';
import { Expediente } from "app/models/expediente";
import { Usuario } from "app/models/usuario";


@Component({
  selector: 'app-expediente-paciente',
  templateUrl: './expediente-paciente.component.html',
  styleUrls: ['./expediente-paciente.component.scss'],
  providers: [PacientesService, EnfermedadesService, PaisesService]

})
export class ExpedientePacienteComponent implements OnInit {
  
  //todas las enfermedades
  public enfermedades: Array<Enfermedad> = new Array<Enfermedad>();//<--sera pasado al componente add y edit
  //todos los paises
  public paises: Array<any> = new Array<any>();//<--sera pasado al componente add y edit


  public paciente: Paciente;

  constructor(private pacientesService: PacientesService, private enfermedadesService: EnfermedadesService, private paisesService: PaisesService) { }

  ngOnInit() {

    //obtenemos todos los paises
    this.paisesService.listCountries2()
      .map((paises: Array<any>) => {
        return paises;
      })
      .subscribe(res => this.paises = res);


    //obtenemos todas las enfermedades
    this.enfermedadesService.list()
      .map((enfermedades: Array<any>) => {
        let result: Array<Enfermedad> = new Array<Enfermedad>();
        if (enfermedades) {
          enfermedades.forEach((enfermedad) => {
            result.push(new Enfermedad(enfermedad.codigoEnfermedad, enfermedad.nombreEnfermedad, enfermedad.idEnfermedad));
          });
        }
        return result;
      })
      .subscribe(res => this.enfermedades = res);



    //obtenemos el  paciente

    let identidad = JSON.parse(localStorage.getItem("identity"));
    console.log("ENVIANDO IDENTIDAD: " + JSON.stringify(identidad));
    this.pacientesService.datos(identidad)
      .map((paciente: any) => {
        let result: Paciente ;
            // console.log("INICIO PACIENTE");
            // console.log(JSON.stringify(paciente));
            // console.log("FIN PACIENTE");
            let father:Padre;
            let mother:Padre;
            paciente.idPadre.forEach((p)=>{
              let f =new Padre(
                p.nombre1,
                p.nombre2,
                p.apellido1,
                p.apellido2,
                p.apellidoCasada,
                p.documentoUnico,
                p.genero,
                p.idSubdivision,
                new Array<Enfermedad>(),//<----- lista de enfermedades. no se si vendran incluidas debo consultar las enfermedades del padre :( despues
                p.idPadre
              );

              // console.log("PADREEEE "+JSON.stringify(p));

              if(f.genero=='F'){
                mother=f;
              }else{
                father=f;
              }
            });
            //let tipindx:number = this.indexOfEspecialidad(new Especialidad(cirugia.idEspecialidad.codigoEspecialidad,cirugia.idEspecialidad.nombreEspecialidad,cirugia.idEspecialidad.idEspecialidad),this.especialidades);
            result=new Paciente(
              paciente.nombre1,
              paciente.nombre2,
              paciente.apellido1,
              paciente.apellido2,
              paciente.apellidoCasada,
              paciente.documentoUnico,
              paciente.diaNacimientoPaciente,
              paciente.mesNacimientoPaciente,
              paciente.anioNacimientoPaciente,
              paciente.genero,
              paciente.idSubdivision,
              paciente.telFijo,
              paciente.telMovil,
              paciente.email,
              // new Expediente(
              //   paciente.idExpediente.diaAperturaExpediente,
              //   paciente.idExpediente.mesAperturaExpediente,
              //   paciente.idExpediente.anioAperturaExpediente,
              //   paciente.idExpediente.diaExpiracionExpediente,
              //   paciente.idExpediente.mesExpiracionExpediente,
              //   paciente.idExpediente.anioExpiracionExpediente,
              //   paciente.idExpediente.numeroExpediente,
              //   //agregar estado expediente
              //   null,//<--rompo la referencia circular (aqui va el paciente actual).
              //   paciente.idExpediente.idExpediente
              // ),
              null,//<------expediente en null en un principio
              new Responsable(
                paciente.idResponsable.nombre1,
                paciente.idResponsable.nombre2,
                paciente.idResponsable.apellido1,
                paciente.idResponsable.apellido2,
                paciente.idResponsable.genero,
                paciente.idResponsable.apellidoCasada,
                paciente.idResponsable.documentoUnico,
                paciente.idResponsable.idSubdivision,
                paciente.idResponsable.telFijo,
                paciente.idResponsable.telMovil,
                paciente.idResponsable.idResponsable
              ),
              father,
              mother,
              new Array<Enfermedad>(),//<----- lista de enfermedades. no se si vendran incluidas debo consultar las enfermedades del paciente despues :(
              // new Usuario(
              //   paciente.idUsuario.username, paciente.idUsuario.password, paciente.idUsuario.estado,null, paciente.idUsuario.idUsuario //<--no me interesa su rol
              // ),
              null,//<------- Este es el usuario actual
              paciente.idPaciente
            );
        
        console.log(JSON.stringify(result));
        return result;
      })
      .subscribe(res => this.paciente = res);


  }

}
