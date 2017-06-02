import { Component, OnInit } from '@angular/core';
import {PacientesService} from 'app/services/pacientes.service';
import {EnfermedadesService} from 'app/services/enfermedades.service';
import {PaisesService} from 'app/services/paises.service';
import {Paciente} from 'app/models/paciente';
import {Expediente} from 'app/models/expediente';
import {Enfermedad} from 'app/models/enfermedad';
import {Padre} from 'app/models/padre';
import {Responsable} from 'app/models/responsable';
import {Rol} from 'app/models/rol';
import {Usuario} from 'app/models/usuario';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss'],
  providers: [PacientesService,EnfermedadesService,PaisesService]
})
export class PacientesComponent implements OnInit {

  //todas las enfermedades
  public enfermedades:Array<Enfermedad>=new Array<Enfermedad>();//<--sera pasado al componente add y edit
  //todos los pacientes
  public pacientes:Array<Paciente>=new Array<Paciente>();//<--sera pasado al componente add y edit
  //todos los paises
  public paises:Array<any>=new Array<any>();//<--sera pasado al componente add y edit
 
  

  constructor(private pacientesService:PacientesService, private enfermedadesService:EnfermedadesService, private paisesService:PaisesService) { }

  ngOnInit() {

    this.enfermedades.push(
      new Enfermedad('as','Evola',1),
      new Enfermedad('ax','Rubiola',2),
      new Enfermedad('ax','Sarampion',3),
      new Enfermedad('ax','Varicela',4),
      new Enfermedad('ax','Ramon',5),
    );

    let p=new Paciente(
            'Jose',
            'Antonio',
            'Perez',
            'Juarez',
            '',
            '00554989',
            15,
            7,
            1992,
            'M',
            'El Salvador',
            'San Salvador',
            'Ilopango',
            '228596632',
            '789895533',
            'jose_perez@gmail.com',
            null,
            new Responsable(
              'Ana',
              'Gabriela',
              'Perez',
              'Juares',
              'El Salvador',
              'San Salvador',
              'Ilopango',
              '228596632',
              '789895533',
              null
            ),
            // new Padre(
            //   paciente.idPadre.nombre1,
            //   paciente.idPadre.nombre2,
            //   paciente.idPadre.apellido1,
            //   paciente.idPadre.apellido2,
            //   paciente.idPadre.generoPadre,
            //   paciente.idPadre.pais,
            //   paciente.idPadre.division,
            //   paciente.idPadre.subdivision,
            //   null,//<----- lista de enfermedades. no se si vendran incluidas
            //   paciente.idPadre.idPadre
            // ),
            // new Padre(
            //   paciente.idMadre.nombre1,
            //   paciente.idMadre.nombre2,
            //   paciente.idMadre.apellido1,
            //   paciente.idMadre.apellido2,
            //   paciente.idMadre.generoPadre,
            //   paciente.idMadre.pais,
            //   paciente.idMadre.division,
            //   paciente.idMadre.subdivision,
            //   null,//<----- lista de enfermedades. no se si vendran incluidas
            //   paciente.idMadre.idPadre
            // ),
            [new Enfermedad('E001','Evola',1),new Enfermedad('E007','Cancer',7)],//<----- lista de enfermedades. no se si vendran incluidas
            null,
            null
          );
    let padre =  new Padre(
              'Miguel',
              'Antonio',
              'Perez',
              'Martinez',
              '78999875-879',
              'M',
              'El Salvador',
              'San Salvador',
              'Ilopango',
              [new Enfermedad('E001','Evola',1),new Enfermedad('E007','Cancer',7)],
              null
            )
    
    let madre =  new Padre(
              'Angela',
              'Angelica',
              'Juarez',
              'Aguilar',
              '78999875-879',
              'F',
              'El Salvador',
              'San Salvador',
              'Ilopango',
              [new Enfermedad('E004','Rubiola',1),new Enfermedad('E007','Cancer',7)],
              null
            )

    p.padre=padre;
    p.madre=madre;

    console.log(JSON.stringify(p));

    let p2=new Paciente(
            'Jose',
            'Antonio',
            'Perez',
            'Juarez',
            '',
            '00554989',
            15,
            7,
            1992,
            'M',
            'El Salvador',
            'San Salvador',
            'Ilopango',
            '228596632',
            '789895533',
            'jose_perez@gmail.com',
            new Expediente(
              55,
              55,
              55,
              55,
              55,
              55,
              55,
              55,
              55,
              55,
              55,
              55,
              null,//<--rompo la referencia circular (aqui va el paciente actual).
              1
            ),
            new Responsable(
              'Ana',
              'Gabriela',
              'Perez',
              'Juares',
              'El Salvador',
              'San Salvador',
              'Ilopango',
              '228596632',
              '789895533',
              58
            ),
            // new Padre(
            //   paciente.idPadre.nombre1,
            //   paciente.idPadre.nombre2,
            //   paciente.idPadre.apellido1,
            //   paciente.idPadre.apellido2,
            //   paciente.idPadre.generoPadre,
            //   paciente.idPadre.pais,
            //   paciente.idPadre.division,
            //   paciente.idPadre.subdivision,
            //   null,//<----- lista de enfermedades. no se si vendran incluidas
            //   paciente.idPadre.idPadre
            // ),
            // new Padre(
            //   paciente.idMadre.nombre1,
            //   paciente.idMadre.nombre2,
            //   paciente.idMadre.apellido1,
            //   paciente.idMadre.apellido2,
            //   paciente.idMadre.generoPadre,
            //   paciente.idMadre.pais,
            //   paciente.idMadre.division,
            //   paciente.idMadre.subdivision,
            //   null,//<----- lista de enfermedades. no se si vendran incluidas
            //   paciente.idMadre.idPadre
            // ),
            [new Enfermedad('E001','Evola',1),new Enfermedad('E007','Cancer',7)],//<----- lista de enfermedades. no se si vendran incluidas
            new Usuario(
              'jjuarez23','secreto123',true,null,85 //<--no me interesa su rol
            ),
            45
          );

    padre.id=74;
    madre.id=55;
    p2.padre=padre;
    p2.madre=madre;

    console.log(JSON.stringify(p2));


    //obtenemos todos los paises
    this.paisesService.listCountries()
    .map((paises: Array<any>)=>{
      return paises;
    })
    .subscribe( res => this.paises=res);


    //obtenemos todas las enfermedades
    this.enfermedadesService.list()
    .map((enfermedades: Array<any>)=>{
      let result: Array<Enfermedad> = new Array<Enfermedad>();
      if(enfermedades){
        enfermedades.forEach((enfermedad)=>{
          result.push(new Enfermedad(enfermedad.codigoEnfermedad,enfermedad.nombreEnfermedad,enfermedad.idEnfermedad));
        });
      }
      return result;
    })
    .subscribe( res => this.enfermedades = res);


    //obtenemos los pacientes
    this.pacientesService.list()
    .map((pacientes: Array<any>)=>{
      let result: Array<Paciente> = new Array<Paciente>();
      if(pacientes){
        pacientes.forEach((paciente)=>{
          //let tipindx:number = this.indexOfEspecialidad(new Especialidad(cirugia.idEspecialidad.codigoEspecialidad,cirugia.idEspecialidad.nombreEspecialidad,cirugia.idEspecialidad.idEspecialidad),this.especialidades);
          result.push(new Paciente(
            paciente.nombre1,
            paciente.nombre2,
            paciente.apellido1,
            paciente.apellido2,
            paciente.apellido_casada,
            paciente.dui,
            paciente.dia_nacimiento,
            paciente.mes_nacimiento,
            paciente.anio_nacimiento,
            paciente.genero,
            paciente.pais,
            paciente.division,
            paciente.subdivision,
            paciente.tel_fijo,
            paciente.tel_movil,
            paciente.email,
            new Expediente(
              paciente.idExpediente.ultimoPeso,
              paciente.idExpediente.ultimaTemperatura,
              paciente.idExpedienteultimaEstatura,
              paciente.idExpedienteultimaPresionArterial,
              paciente.idExpedienteultimoRitmoCardiaco,
              paciente.idExpedientediaAperturaExpediente,
              paciente.idExpedientemesAperturaExpediente,
              paciente.idExpedienteanioAperturaExpediente,
              paciente.idExpedientediaExpiracionExpediente,
              paciente.idExpedientemesExpiracionExpediente,
              paciente.idExpedienteanioExpiracionExpediente,
              paciente.idExpedientenumeroExpediente,
              null,//<--rompo la referencia circular (aqui va el paciente actual).
              paciente.idExpediente.idExpediente
            ),
            new Responsable(
              paciente.idResponsable.nombre1,
              paciente.idResponsable.nombre2,
              paciente.idResponsable.apellido1,
              paciente.idResponsable.apellido2,
              paciente.idResponsable.pais,
              paciente.idResponsable.division,
              paciente.idResponsable.subdivision,
              paciente.idResponsable.telFijo,
              paciente.idResponsable.telCel,
              paciente.idResponsable.idResponsable
            ),
            // new Padre(
            //   paciente.idPadre.nombre1,
            //   paciente.idPadre.nombre2,
            //   paciente.idPadre.apellido1,
            //   paciente.idPadre.apellido2,
            //   paciente.idPadre.generoPadre,
            //   paciente.idPadre.pais,
            //   paciente.idPadre.division,
            //   paciente.idPadre.subdivision,
            //   null,//<----- lista de enfermedades. no se si vendran incluidas
            //   paciente.idPadre.idPadre
            // ),
            // new Padre(
            //   paciente.idMadre.nombre1,
            //   paciente.idMadre.nombre2,
            //   paciente.idMadre.apellido1,
            //   paciente.idMadre.apellido2,
            //   paciente.idMadre.generoPadre,
            //   paciente.idMadre.pais,
            //   paciente.idMadre.division,
            //   paciente.idMadre.subdivision,
            //   null,//<----- lista de enfermedades. no se si vendran incluidas
            //   paciente.idMadre.idPadre
            // ),
            null,//<----- lista de enfermedades. no se si vendran incluidas
            new Usuario(
              paciente.idUsuario.username,'',paciente.idUsuario.estado,null,paciente.idUsuario.idUsuario //<--no me interesa su rol
            ),
            paciente.idPaciente
          ));
        });
      }
      return result;
    })
    .subscribe( res => this.pacientes = res);

  }

}
