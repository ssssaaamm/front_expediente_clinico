import { Especialidad } from './especialidad';
import {Usuario} from './usuario';
import { Empleado } from "app/models/empleado";
import {Jornada} from './jornada';

export class Medico{
    constructor(
        public especialidad:Array<Especialidad>,
        public jornada:Array<Jornada>,
        public codigo:string,
        public id?:number
    ){}

// Esnecesario. algo de refencias!!!
    public clone():Medico{
        return new Medico(this.especialidad,this.jornada,this.codigo,this.id);
    }

    public full_clone():Medico{
        return new Medico(this.especialidad,this.jornada,this.codigo,this.id);
    }
}