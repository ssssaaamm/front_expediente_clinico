import { Component, OnInit, Output } from '@angular/core';
import { PacientesService } from 'app/services/pacientes.service';
import { EnfermedadesService } from 'app/services/enfermedades.service';
import { PaisesService } from 'app/services/paises.service';
import { Paciente } from 'app/models/paciente';
import { Expediente } from 'app/models/expediente';
import { Enfermedad } from 'app/models/enfermedad';
import { Padre } from 'app/models/padre';
import { Responsable } from 'app/models/responsable';
import { Rol } from 'app/models/rol';
import { Usuario } from 'app/models/usuario';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss'],
  providers: [PacientesService, EnfermedadesService, PaisesService]
})
export class PacientesComponent implements OnInit {

  //todas las enfermedades
  public enfermedades: Array<Enfermedad> = new Array<Enfermedad>();//<--sera pasado al componente add y edit
  //todos los pacientes
  public pacientes: Array<Paciente> = new Array<Paciente>();//<--sera pasado al componente add y edit
  //todos los paises
  public paises: Array<any> = new Array<any>();//<--sera pasado al componente add y edit



  constructor(private pacientesService: PacientesService, private enfermedadesService: EnfermedadesService, private paisesService: PaisesService) { }

  ngOnInit() {

    // this.enfermedades.push(
    //   new Enfermedad('01', 'Evola', 1),
    //   new Enfermedad('02', 'Rubiola', 2),
    //   new Enfermedad('03', 'Sarampion', 3),
    //   new Enfermedad('04', 'Varicela', 4),
    //   new Enfermedad('05', 'Ramon', 5),
    // );


    //agregar
    // let p = new Paciente(
    //   'Jose',
    //   'Antonio',
    //   'Perez',
    //   'Juarez',
    //   '',
    //   '00554989',
    //   15,
    //   7,
    //   1992,
    //   'M',
    //   'El Salvador',
    //   'San Salvador',
    //   'Ilopango',
    //   '228596632',
    //   '789895533',
    //   'jose_perez@gmail.com',
    //   null,
    //   new Responsable(
    //     'Ana',
    //     'Gabriela',
    //     'Perez',
    //     'Juares',
    //     '789998998-99',
    //     'El Salvador',
    //     'San Salvador',
    //     'Ilopango',
    //     '228596632',
    //     '789895533',
    //     null
    //   ),
    //   new Padre(
    //     'Miguel',
    //     'Antonio',
    //     'Perez',
    //     'Martinez',
    //     '78999875-879',
    //     'M',
    //     'El Salvador',
    //     'San Salvador',
    //     'Ilopango',
    //     [new Enfermedad('E001', 'Evola', 1), new Enfermedad('E007', 'Cancer', 7)],
    //     null
    //   ),
    //   new Padre(
    //     'Angela',
    //     'Angelica',
    //     'Juarez',
    //     'Aguilar',
    //     '78999875-879',
    //     'F',
    //     'El Salvador',
    //     'San Salvador',
    //     'Ilopango',
    //     [new Enfermedad('E004', 'Rubiola', 1), new Enfermedad('E007', 'Cancer', 7)],
    //     null
    //   ),
    //   [new Enfermedad('E001', 'Evola', 1), new Enfermedad('E007', 'Cancer', 7)],//<----- lista de enfermedades. no se si vendran incluidas
    //   null,
    //   null
    // );
    // console.log(JSON.stringify(p));

    // //editar
    // let p2 = new Paciente(
    //   'Jose',
    //   'Antonio',
    //   'Perez',
    //   'Juarez',
    //   '',
    //   '00554989',
    //   15,
    //   7,
    //   1992,
    //   'M',
    //   'El Salvador',
    //   'San Salvador',
    //   'Ilopango',
    //   '228596632',
    //   '789895533',
    //   'jose_perez@gmail.com',
    //   new Expediente(
    //     55,
    //     55,
    //     55,
    //     55,
    //     55,
    //     55,
    //     55,
    //     null,//<--rompo la referencia circular (aqui va el paciente actual).
    //     null, //<-- no me interesan los signos vitales aqui ya que se trata de registro de pacientes
    //     1
    //   ),
    //   new Responsable(
    //     'Ana',
    //     'Gabriela',
    //     'Perez',
    //     'Juares',
    //     '789896-69',
    //     'El Salvador',
    //     'San Salvador',
    //     'Ilopango',
    //     '228596632',
    //     '789895533',
    //     58
    //   ),
    //   new Padre(
    //     'Miguel',
    //     'Antonio',
    //     'Perez',
    //     'Martinez',
    //     '78999875-879',
    //     'M',
    //     'El Salvador',
    //     'San Salvador',
    //     'Ilopango',
    //     [new Enfermedad('E001', 'Evola', 1), new Enfermedad('E007', 'Cancer', 7)],
    //     null
    //   ),
    //   new Padre(
    //     'Angela',
    //     'Angelica',
    //     'Juarez',
    //     'Aguilar',
    //     '78999875-879',
    //     'F',
    //     'El Salvador',
    //     'San Salvador',
    //     'Ilopango',
    //     [new Enfermedad('E004', 'Rubiola', 1), new Enfermedad('E007', 'Cancer', 7)],
    //     null
    //   ),
    //   [new Enfermedad('E001', 'Evola', 1), new Enfermedad('E007', 'Cancer', 7)],//<----- lista de enfermedades. no se si vendran incluidas
    //   new Usuario(
    //     'jjuarez23', 'secreto123', true, null, 85 //<--no me interesa su rol
    //   ),
    //   45
    // );
    // console.log(JSON.stringify(p2));

    // p2.enfermedades=null;
    // p2.padre.enfermedades=null;
    // p2.madre.enfermedades=null;

    // this.pacientes.push(p2);
    // this.pacientes.push(p2);
    // this.pacientes.push(p2);
    // this.pacientes.push(p2);
    // this.pacientes.push(p2);
    // this.pacientes.push(p2);
    // this.pacientes.push(p2);
    // this.pacientes.push(p2);
    // this.pacientes.push(p2);
    // this.pacientes.push(p2);
    // this.pacientes.push(p2);
    // this.pacientes.push(p2);
    // this.pacientes.push(p2);


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


    //obtenemos los pacientes
    this.pacientesService.list()
      .map((pacientes: Array<any>) => {
        let result: Array<Paciente> = new Array<Paciente>();
        if (pacientes) {
          pacientes.forEach((paciente) => {
            console.log("INICIO PACIENTE");
            console.log(JSON.stringify(paciente));
            console.log("FIN PACIENTE");
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
                null,//<----- lista de enfermedades. no se si vendran incluidas debo consultar las enfermedades del padre :( despues
                p.idPadre
              );

              console.log("PADREEEE "+JSON.stringify(p));

              if(f.genero=='M'){
                mother=f;
              }else{
                father=f;
              }
            });
            //let tipindx:number = this.indexOfEspecialidad(new Especialidad(cirugia.idEspecialidad.codigoEspecialidad,cirugia.idEspecialidad.nombreEspecialidad,cirugia.idEspecialidad.idEspecialidad),this.especialidades);
            result.push(new Paciente(
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
              new Expediente(
                paciente.idExpediente.diaAperturaExpediente,
                paciente.idExpediente.mesAperturaExpediente,
                paciente.idExpediente.anioAperturaExpediente,
                paciente.idExpediente.diaExpiracionExpediente,
                paciente.idExpediente.mesExpiracionExpediente,
                paciente.idExpediente.anioExpiracionExpediente,
                paciente.idExpediente.numeroExpediente,
                //agregar estado expediente
                null,//<--rompo la referencia circular (aqui va el paciente actual).
                paciente.idExpediente.idExpediente
              ),
              //null,//<------expediente en null en un principio
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
                paciente.idResponsable.telCel,
                paciente.idResponsable.idResponsable
              ),
              father,
              mother,
              null,//<----- lista de enfermedades. no se si vendran incluidas debo consultar las enfermedades del paciente despues :(
              new Usuario(
                paciente.idUsuario.username, paciente.idUsuario.password, paciente.idUsuario.estado,null, paciente.idUsuario.idUsuario //<--no me interesa su rol
              ),
              paciente.idPaciente
            ));
          });
        }
        return result;
      })
      .subscribe(res => this.pacientes = res);

      
  }

}
