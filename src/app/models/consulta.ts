import { Especialidad } from './especialidad';

export class Consulta{
    
    constructor(
        public codigo:string, 
        public nombre:string,
        public costo:number,
        public especialidad:Especialidad,
        //?=opcional
        public id?:number 
    ){}

// Esnecesario. algo de refeencias!!!
    public clone():Consulta{
        return new Consulta(this.codigo,this.nombre,this.costo,this.especialidad.clone(),this.id);
    }
}