import {Jornada} from "app/models/jornada";
export class Turno{
    constructor(

        public hora_inicio: any,
        public hora_fin: any,
        public id?:number



    ){}

// Esnecesario. algo de refencias!!!
    public clone():Turno{
        return new Turno(this.hora_inicio,this.hora_fin,this.id);
    }

    // public full_clone():Usuario{
    //     return new Usuario(this.username,this.password,this.estado,this.last_login,this.rol).clone();
    // }

}