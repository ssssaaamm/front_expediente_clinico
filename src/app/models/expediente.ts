import { Paciente } from './paciente';
export class Expediente{
    
    constructor(
        public ultimo_peso:number, 
        public ultima_temperatura:number,
        public ultima_estatura:number,
        public ultima_presion_arterial:number,
        public ultimo_ritmo_cardiaco:number,
        public dia_apertura_expediente:number,
        public mes_apertura_expediente:number,
        public anio_apertura_expediente:number,
        public dia_expiracion_expediente:number,
        public mes_expiracion_expediente:number,
        public anio_expiracion_expediente:number,
        public numero_expediente:number,
        public paciente:Paciente,
        //?=opcional
        public id?:number 
    ){}

// Esnecesario. algo de refeencias!!!
    public clone():Expediente{
        return new Expediente(
            this.ultimo_peso,
            this.ultima_temperatura, 
            this.ultima_estatura, 
            this.ultima_presion_arterial,
            this.ultimo_ritmo_cardiaco,
            this.dia_apertura_expediente,
            this.mes_apertura_expediente,
            this.anio_apertura_expediente,
            this.dia_expiracion_expediente,
            this.mes_expiracion_expediente,
            this.anio_expiracion_expediente,
            this.numero_expediente,
            this.paciente,
            this.id,
        );
    }

    // public full_clone():Paciente{
    //     return new Paciente(this.codigo,this.nombre,this.costo,this.especialidad.clone(),this.id);
    // }
}