export class Especialidad{
    
    constructor(
        public codigo:string, 
        public nombre: string,
        public honorarios:number,
        //?=opcional
        public id?:number 
    ){}

// Esnecesario. algo de refeencias!!!
    public clone():Especialidad{
        return new Especialidad(this.codigo,this.nombre,this.honorarios,this.id);
    }
}