import { Paciente } from './paciente';
import { SignosVitales } from './signos_vitales';
export class Expediente{
    
    constructor(
        public dia_apertura_expediente:number,
        public mes_apertura_expediente:number,
        public anio_apertura_expediente:number,
        public dia_expiracion_expediente:number,
        public mes_expiracion_expediente:number,
        public anio_expiracion_expediente:number,
        public numero_expediente:number,
        public paciente:Paciente,
        public signos_vitales:Array<SignosVitales>,
        //?=opcional
        public id?:number 
    ){}

// Esnecesario. algo de refeencias!!!
    public clone():Expediente{
        return new Expediente(
            this.dia_apertura_expediente,
            this.mes_apertura_expediente,
            this.anio_apertura_expediente,
            this.dia_expiracion_expediente,
            this.mes_expiracion_expediente,
            this.anio_expiracion_expediente,
            this.numero_expediente,
            this.paciente,
            this.signos_vitales,
            this.id,
        );
    }

    // public full_clone():Paciente{
    //     return new Paciente(this.codigo,this.nombre,this.costo,this.especialidad.clone(),this.id);
    // }
}