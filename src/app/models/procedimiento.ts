export class Procedimiento{
    
    constructor(
        public codigo:string, 
        public nombre: string,
        public costo: number,
        //?=opcional
        public id?:number 
    ){}

// Esnecesario. algo de refeencias!!!
    public clone():Procedimiento{
        return new Procedimiento(this.codigo,this.nombre,this.costo,this.id);
    }
}