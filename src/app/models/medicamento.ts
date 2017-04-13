
export class Medicamento{
    constructor(
        public codigo:string, 
        public nombre: string,
        public costo:number, 
        public id?:number
    ){}

// Esnecesario. algo de refencias!!!
    public clone():Medicamento{
        return new Medicamento(this.codigo,this.nombre,this.costo,this.id);
    }
}