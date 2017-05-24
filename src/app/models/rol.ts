export class Rol{
    
    constructor( 
        public nombre:string,
        public descripcion:string,
        //?=opcional
        public id?:number 
    ){}

// Esnecesario. algo de refeencias!!!
    public clone():Rol{
        return new Rol(this.nombre,this.descripcion,this.id);
    }
}