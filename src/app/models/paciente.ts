import { Expediente } from './expediente';
import { Padre } from './padre';
import { Responsable } from './responsable';
import { Usuario } from './usuario';
import {Enfermedad} from './enfermedad';
export class Paciente{

    public padre:Padre;
    public madre:Padre;
    
    constructor(
        public nombre1:string, 
        public nombre2:string,
        public apellido1:string, 
        public apellido2:string,
        public apellido_casada:string,
        public dui:string,
        public dia_nacimiento:number,
        public mes_nacimiento:number,
        public anio_nacimiento:number,
        public genero:string,
        public pais:string,
        public division:string,
        public subdivision:string,
        public tel_fijo:string,
        public tel_movil:string,
        public email:string,
        //atributos compuestos
        public expediente:Expediente,
        public responsable:Responsable, 
        public enfermedades:Array<Enfermedad>,
        public usuario:Usuario,
        //?=opcional
        public id?:number 
    ){}

// Esnecesario. algo de refeencias!!!
    public clone():Paciente{
        let paci:Paciente = new Paciente(this.nombre1,this.nombre2,this.apellido1,this.apellido2,this.apellido_casada,this.dui,this.dia_nacimiento,this.mes_nacimiento,this.anio_nacimiento,this.genero,this.pais,this.division,this.subdivision,this.tel_fijo,this.tel_movil,this.email,this.expediente,this.responsable,this.enfermedades,this.usuario,this.id);
        paci.padre=this.padre;
        paci.madre=this.madre;
        return paci;
    }

    // public full_clone():Paciente{
    //     return new Paciente(this.nombre1,this.nombre2,this.apellido1,this.apellido2,this.pais,this.division,this.subdivision,this.tel_fijo,this.tel_movil,this.email,this.responsable.clone(),this.padre.clone(),this.madre.clone(),this.id);
    // }

}