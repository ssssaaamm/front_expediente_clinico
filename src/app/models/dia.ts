export class Dia{
    constructor(

        public numero: number,
        public nombre: string,
        public id?:number



    ){}

// Esnecesario. algo de refencias!!!
    public clone():Dia{
        return new Dia(this.numero,this.nombre,this.id);
    }

    // public full_clone():Usuario{
    //     return new Usuario(this.username,this.password,this.estado,this.last_login,this.rol).clone();
    // }

}