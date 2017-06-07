import {Usuario} from "app/models/usuario";
import { Medico } from "app/models/medico";

export class Empleado {
    constructor( 
        public dui: string,
        public genero: string,
        public nombre1: string,
        public nombre2: string,
        public apellido1: string,
        public apellido2: string,
        public apellido_casada: string,
        public pais: string,
        public division: string,
        public subdivision:string,
        public tel_fijo: string,
        public tel_movil: string,
        public email: string,
        public usuario: Usuario,
        public medico:Medico,
        public id?:number,

        
    ){}

// Esnecesario. algo de refencias!!!
    public clone():Empleado{
        return new Empleado(this.dui,this.genero,this.nombre1,this.nombre2,
        this.apellido1,this.apellido2,this.apellido_casada,
        this.pais,this.division,this.subdivision,
        this.tel_fijo,this.tel_movil,this.email,this.usuario,
        this.medico,this.id);
    }

 public full_clone(): Empleado {
        return new Empleado(this.dui, this.genero,this.nombre1, this.nombre2, this.apellido1,
            this.apellido2, this.apellido_casada, this.pais, this.division, this.subdivision,
            this.tel_fijo, this.tel_movil, this.email, this.usuario.clone(), this.medico.clone());
    }
}