export class Menu{
    
    constructor( 
        public icono:string,
        public titulo:string,
        public url:string,
        public recurso:string,        
        //?=opcional
        public id?:number 
    ){}

// Esnecesario. algo de refeencias!!!
    public clone():Menu{
        return new Menu(this.icono,this.titulo,this.url,this.recurso,this.id);
    }
}