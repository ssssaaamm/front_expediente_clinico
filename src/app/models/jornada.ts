import {Dia} from "app/models/dia";
import {Medico} from "app/models/medico";
import {Turno} from './turno';

export class Jornada{
    constructor(

        //public medico: Medico,
        public dia: Dia,
        public turno: Array<Turno>,
        public id?:number,



    ){}

// Esnecesario. algo de refencias!!!
    public clone():Jornada{
        return new Jornada(this.dia,this.turno,this.id);
    }

    // public full_clone():Usuario{
    //     return new Usuario(this.username,this.password,this.estado,this.last_login,this.rol).clone();
    // }

}