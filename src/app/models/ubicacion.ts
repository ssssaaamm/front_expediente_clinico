import { TipoUbicacion } from "app/models/tipo_ubicacion";

export class Ubicacion {
    
    constructor(
        public codigo:string, 
        public nombre: string,
        public nivel: number,
        public numero: number,
        public tipo:TipoUbicacion,
        //?=opcional
        public id?:number 
    ){}

// Esnecesario. algo de refeencias!!!
    public clone():Ubicacion{
        return new Ubicacion(this.codigo,this.nombre,this.nivel,this.numero,this.tipo.clone(),this.id);
    }
}