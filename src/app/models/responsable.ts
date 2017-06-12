export class Responsable{
    
    constructor(
        public nombre1:string, 
        public nombre2:string,
        public apellido1:string, 
        public apellido2:string,
        public apellido_casada: string,
        public documento_unico:string,
        public subdivision:any,
        public tel_fijo:string,
        public tel_movil:string,
        //?=opcional
        public id?:number 
    ){}

// Esnecesario. algo de refeencias!!!
    public clone():Responsable{
        return new Responsable(this.nombre1,this.nombre2,this.apellido1,this.apellido2,this.apellido_casada,this.documento_unico,this.subdivision,this.tel_fijo,this.tel_movil,this.id);
    }

    // public full_clone():Responsable{
    //     return new Responsable(this.nombre1,this.nombre2,this.apellido1,this.apellido2,this.genero,this.pais,this.division,this.subdivision);
    // }
}