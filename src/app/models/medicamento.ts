import { TipoMedicamento } from './tipo_medicamento';
export class Medicamento{
    constructor(
        public codigo:string, 
        public nombre: string,
        public tipo:TipoMedicamento,
        public costo:number, 
        public id?:number
    ){}

// Esnecesario. algo de refencias!!!
    public clone():Medicamento{
        return new Medicamento(this.codigo,this.nombre,this.tipo,this.costo,this.id);
    }

    public full_clone():Medicamento{
        return new Medicamento(this.codigo,this.nombre,this.tipo.clone(),this.costo,this.id);
    }
}