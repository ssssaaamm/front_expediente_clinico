import { Especialidad } from './especialidad';
import {Usuario} from './usuario';

export class Medico{
    constructor(
        public especialidad:Especialidad,
        public usuario:Usuario, 
        public id?:number
    ){}

// Esnecesario. algo de refencias!!!
    public clone():Medico{
        return new Medico(this.especialidad,this.usuario,this.id);
    }

    public full_clone():Medico{
        return new Medico(this.especialidad.clone(),this.usuario.clone(),this.id);
    }
}