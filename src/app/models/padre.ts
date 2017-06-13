import {Enfermedad} from './enfermedad';
export class Padre{
    
    constructor(
        public nombre1:string, 
        public nombre2:string,
        public apellido1:string, 
        public apellido2:string,
        public apellido_casada: string,
        public documento_unico:string,
        public genero:string,
        public subdivision:any,
        public enfermedades:Array<Enfermedad>,
        // public tel_fijo:string,
        // public tel_movil:string,
        // public email:string,
        //?=opcional
        public id?:number 
    ){}

// Esnecesario. algo de refeencias!!!
    public clone():Padre{
        return new Padre(this.nombre1,this.nombre2,this.apellido1,this.apellido2,this.apellido_casada,this.documento_unico,this.genero,this.subdivision,this.enfermedades,this.id);
    }

    // public full_clone():Padre{
    //     return new Padre(this.nombre1,this.nombre2,this.apellido1,this.apellido2,this.genero,this.pais,this.division,this.subdivision);
    // }
}