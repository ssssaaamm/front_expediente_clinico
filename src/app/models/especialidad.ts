export class Especialidad{
    
    constructor(
        public codigo:string, 
        public nombre: string,
        public id?:number 
    ){}

    public clone():Especialidad{
        return new Especialidad(this.codigo,this.nombre,this.id);
    }
}