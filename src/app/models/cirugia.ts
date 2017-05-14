import { Especialidad } from './especialidad';
export class Cirugia{
    
    constructor(
        public codigo:string, 
        public nombre:string,
        public costo:number,
        public especialidad:Especialidad,
        //?=opcional
        public id?:number 
    ){}

// Esnecesario. algo de refeencias!!!
    public clone():Cirugia{
        return new Cirugia(this.codigo,this.nombre,this.costo,this.especialidad,this.id);
    }

    public full_clone():Cirugia{
        return new Cirugia(this.codigo,this.nombre,this.costo,this.especialidad.clone(),this.id);
    }
}