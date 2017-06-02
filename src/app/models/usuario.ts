import {Rol} from "app/models/rol";
export class Usuario{
    constructor(
        
        public username: string,
        public password: string,
        public estado: boolean,
        public rol: Rol,
        public id?:number, 

        
    ){}

// Esnecesario. algo de refencias!!!
    public clone():Usuario{
        return new Usuario(this.username,this.password,this.estado,this.rol,this.id);
    }

    // public full_clone():Usuario{
    //     return new Usuario(this.username,this.password,this.estado,this.last_login,this.rol).clone();
    // }
}