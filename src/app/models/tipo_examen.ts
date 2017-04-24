export class TipoExamen{
    constructor(
        public nombre: string,
        public codigo: number, 
        public id?:number
    ){}

// Esnecesario. algo de refencias!!!
    public clone():TipoExamen{
        return new TipoExamen(this.nombre,this.codigo,this.id);
    }

    public getStringValue():string{
        let value:string;
        switch(this.codigo){
            case 1:
                value="Clinico";
                break;
            case 2:
                value="Fisico";
                break;
        }
        return value;
    }
}