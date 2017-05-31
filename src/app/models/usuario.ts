import {Rol} from "app/models/rol";
export class Usuario{
    constructor(
        public id:number    , 
        public username: string,
        public password: string,
        public estado: boolean,
        public last_login: Date, 
        public rol: Rol

        
    ){}

// Esnecesario. algo de refencias!!!
    public clone():Usuario{
        return new Usuario(this.id,this.username,this.password,this.estado,this.last_login,this.rol);
    }

    public full_clone():Usuario{
        return new Usuario(this.id,this.username,this.password,this.estado,this.last_login,this.rol).clone();
    }
}