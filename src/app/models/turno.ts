import {Jornada} from "app/models/jornada";
export class Turno{
    constructor(

        public desde: string,
        public hasta: string,
        public id?:number



    ){}

// Esnecesario. algo de refencias!!!
    public clone():Turno{
        return new Turno(this.desde,this.hasta,this.id);
    }

    // public full_clone():Usuario{
    //     return new Usuario(this.username,this.password,this.estado,this.last_login,this.rol).clone();
    // }

}