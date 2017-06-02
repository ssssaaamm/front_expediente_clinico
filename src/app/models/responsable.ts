export class Responsable{
    
    constructor(
        public nombre1:string, 
        public nombre2:string,
        public apellido1:string, 
        public apellido2:string,
        public dui:string,
        public pais:string,
        public division:string,
        public subdivision:string,
        public tel_fijo:string,
        public tel_movil:string,
        //?=opcional
        public id?:number 
    ){}

// Esnecesario. algo de refeencias!!!
    public clone():Responsable{
        return new Responsable(this.nombre1,this.nombre2,this.apellido1,this.apellido2,this.dui,this.pais,this.division,this.subdivision,this.tel_fijo,this.tel_movil,this.id);
    }

    // public full_clone():Responsable{
    //     return new Responsable(this.nombre1,this.nombre2,this.apellido1,this.apellido2,this.genero,this.pais,this.division,this.subdivision);
    // }
}