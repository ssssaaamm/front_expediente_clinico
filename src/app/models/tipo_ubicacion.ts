export class TipoUbicacion{
    constructor(
        public nombre: string,
        public id?:number
    ){}

// Esnecesario. algo de refencias!!!
    public clone():TipoUbicacion{
        return new TipoUbicacion(this.nombre,this.id);
    }
}