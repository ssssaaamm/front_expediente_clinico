
export class Usuario{
    constructor(
        public id:number    , 
        public nombre1: string,
        public nombre2: string,
        public apellido1: string,
        public apellido2: string,
        public apellido_casada: string,
        public pais: string,
        public division: string,
        public subdivision:string,
        public tel_fijo: string,
        public tel_movil: string,
        public email: string,
        public username: string,
        public password: string,

        
    ){}

// Esnecesario. algo de refencias!!!
    public clone():Usuario{
        return new Usuario(this.id,this.nombre1,this.nombre2,this.apellido1,this.apellido2,this.apellido_casada,this.pais,this.division,this.subdivision,this.tel_fijo,this.tel_movil,this.email,this.username,this.password);
    }

    public full_clone():Usuario{
        return new Usuario(this.id,this.nombre1,this.nombre2,this.apellido1,this.apellido2,this.apellido_casada,this.pais,this.division,this.subdivision,this.tel_fijo,this.tel_movil,this.email,this.username,this.password);
    }
}