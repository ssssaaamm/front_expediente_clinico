export class TipoMedicamento{
    constructor(
        public presentacion: number, 
        public id?:number
    ){}

// Esnecesario. algo de refencias!!!
    public clone():TipoMedicamento{
        return new TipoMedicamento(this.presentacion,this.id);
    }

    public getStringValue():string{
        let value:string;
        switch(this.presentacion){
            case 1:
                value="Oral";
                break;
            case 2:
                value="Inyectable";
                break;
            case 3:
                value="Topico";
                break;
        }
        return value;
    }
}