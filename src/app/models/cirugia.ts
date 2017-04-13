export class Cirugia{
    
    constructor(
        public codigo:string, 
        public nombre:string,
        public costo:number,
        //?=opcional
        public id?:number 
    ){}

// Esnecesario. algo de refeencias!!!
    public clone():Cirugia{
        return new Cirugia(this.codigo,this.nombre,this.costo,this.id);
    }
}