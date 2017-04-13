export class Enfermedad{
    
    constructor(
        public codigo:string, 
        public nombre: string,
        //?=opcional
        public id?:number 
    ){}

// Esnecesario. algo de refeencias!!!
    public clone():Enfermedad{
        return new Enfermedad(this.codigo,this.nombre,this.id);
    }
}