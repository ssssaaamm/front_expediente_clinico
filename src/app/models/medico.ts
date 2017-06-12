import { Especialidad } from './especialidad';
import {Usuario} from './usuario';
import { Empleado } from "app/models/empleado";
import {Jornada} from './jornada';

export class Medico{
    constructor(
        public especialidades:Array<Especialidad>,
        public jornadas:Array<Jornada>,
        public codigo:string,
        public id?:number
    ){}

// Esnecesario. algo de refencias!!!
    public clone():Medico{
        return new Medico(this.especialidades,this.jornadas,this.codigo,this.id);
    }

    public full_clone():Medico{
        return new Medico(this.especialidades,this.jornadas,this.codigo,this.id);
    }
}