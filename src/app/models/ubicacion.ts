export class Ubicacion{
    
    constructor(
        public codigo:string, 
        public nombre: string,
        public nivel: number,
        public numero: number,
        //?=opcional
        public id?:number 
    ){}

// Esnecesario. algo de refeencias!!!
    public clone():Ubicacion{
        return new Ubicacion(this.codigo,this.nombre,this.nivel,this.numero,this.id);
    }
}