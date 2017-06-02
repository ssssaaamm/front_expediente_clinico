import { Especialidad } from './especialidad';
import {Usuario} from './usuario';
import { Empleado } from "app/models/empleado";

export class Medico{
    constructor(
        public especialidad:Especialidad,
        public codigo:string,
        public id?:number
    ){}

// Esnecesario. algo de refencias!!!
    public clone():Medico{
        return new Medico(this.especialidad,this.codigo,this.id);
    }

    public full_clone():Medico{
        return new Medico(this.especialidad.clone(),this.codigo,this.id);
    }
}