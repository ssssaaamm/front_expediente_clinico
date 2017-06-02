export class SignosVitales{
    
    constructor(
        public peso:number, 
        public temperatura:number,
        public estatura:number,
        public presion_arterial:number,
        public ritmo_cardiaco:number,
        public dia_toma:number,
        public mes_toma:number,
        public anio_toma:number,
        //?=opcional
        public id?:number 
    ){}

// Esnecesario. algo de refeencias!!!
    public clone():SignosVitales{
        return new SignosVitales(
            this.peso,
            this.temperatura, 
            this.estatura, 
            this.presion_arterial,
            this.ritmo_cardiaco,
            this.dia_toma,
            this.mes_toma,
            this.anio_toma,
            this.id,
        );
    }

    // public full_clone():Paciente{
    //     return new Paciente(this.codigo,this.nombre,this.costo,this.especialidad.clone(),this.id);
    // }
}