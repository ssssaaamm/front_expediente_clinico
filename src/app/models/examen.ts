export class Examen{
    constructor(
        public tipo:string,
        public codigo:string, 
        public nombre: string,
        public costo:number, 
        public id?:number
    ){}

// Esnecesario. algo de refencias!!!
    public clone():Examen{
        return new Examen(this.tipo,this.codigo,this.nombre,this.costo,this.id);
    }
}                    