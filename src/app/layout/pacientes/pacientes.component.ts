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
    this.paisesService.listCountries()
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
            //let tipindx:number = this.indexOfEspecialidad(new Especialidad(cirugia.idEspecialidad.codigoEspecialidad,cirugia.idEspecialidad.nombreEspecialidad,cirugia.idEspecialidad.idEspecialidad),this.especialidades);
            result.push(new Paciente(
              paciente.nombre1,
              paciente.nombre2,
              paciente.apellido1,
              paciente.apellido2,
              paciente.apellidoCasadoPaciente,
              paciente.documento_unico,
              paciente.diaNacimientoPaciente,
              paciente.mesNacimientoPaciente,
              paciente.anioNacimientoPaciente,
              paciente.genero,
              paciente.subdivision,
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
              new Responsable(
                paciente.idResponsable.nombre1,
                paciente.idResponsable.nombre2,
                paciente.idResponsable.apellido1,
                paciente.idResponsable.apellido2,
                paciente.idResponsable.documento_unico,
                paciente.idResponsable.subdivision,
                paciente.idResponsable.telFijo,
                paciente.idResponsable.telCel,
                paciente.idResponsable.idResponsable
              ),
              new Padre(
                paciente.idPadre.nombre1,
                paciente.idPadre.nombre2,
                paciente.idPadre.apellido1,
                paciente.idPadre.apellido2,
                paciente.idPadre.apellido_casada,
                paciente.idPadre.documento_unico,
                paciente.idPadre.genero,
                paciente.idPadre.subdivision,
                null,//<----- lista de enfermedades. no se si vendran incluidas debo consultar las enfermedades del padre :( despues
                paciente.idPadre.idPadre
              ),
              new Padre(
                paciente.idMadre.nombre1,
                paciente.idMadre.nombre2,
                paciente.idMadre.apellido1,
                paciente.idMadre.apellido2,
                paciente.idMadre.apellido_casada,
                paciente.idMadre.documento_unico,
                paciente.idMadre.genero,
                paciente.idMadre.subdivision,
                null,//<----- lista de enfermedades. no se si vendran incluidas
                paciente.idMadre.idPadre
              ),
              null,//<----- lista de enfermedades. no se si vendran incluidas debo consultar las enfermedades del paciente despues :(
              new Usuario(
                paciente.idUsuario.username, paciente.idUsuario.password, paciente.idUsuario.estado, null, paciente.idUsuario.idUsuario //<--no me interesa su rol
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
