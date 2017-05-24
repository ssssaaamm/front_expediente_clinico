import {Menu} from './menu';
import {Rol} from './rol';
export class MenuRol{
    
    constructor( 
        public orden:number,
        public list:boolean,        
        public add:boolean,
        public edit:boolean,
        public del:boolean,
        public menu:Menu,
        public rol:Rol,
        //?=opcional
        public id?:number 
    ){}

// Esnecesario. algo de refeencias!!!
    public clone():MenuRol{
        return new MenuRol(this.orden,this.list,this.add,this.edit,this.del,this.menu,this.rol,this.id);
    }

    public full_clone():MenuRol{
        return new MenuRol(this.orden,this.list,this.add,this.edit,this.del,this.menu.clone(),this.rol.clone(),this.id);
    }
}