export class Especialidad{
    
    constructor(
        public codigo:string, 
        public nombre: string,
        //?=opcional
        public id?:number 
    ){}

// Esnecesario. algo de refeencias!!!
    public clone():Especialidad{
        return new Especialidad(this.codigo,this.nombre,this.id);
    }
}