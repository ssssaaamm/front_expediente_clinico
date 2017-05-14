import {TipoExamen} from './tipo_examen';
export class Examen{
    constructor(
        public codigo:string, 
        public nombre: string,
        public tipo:TipoExamen,
        public costo:number, 
        public id?:number
    ){}

// Esnecesario. algo de refencias!!!
    public clone():Examen{
        return new Examen(this.codigo,this.nombre,this.tipo,this.costo,this.id);
    }

    public full_clone():Examen{
        return new Examen(this.codigo,this.nombre,this.tipo.clone(),this.costo,this.id);
    }
}                    