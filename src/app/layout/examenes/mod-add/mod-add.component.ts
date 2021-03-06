import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Examen } from "app/models/examen";
import { ExamenesService } from "app/services/examenes.service";
import { TipoExamen } from 'app/models/tipo_examen';
import  createNumberMask from 'text-mask-addons/dist/createNumberMask';
@Component({
  selector: 'app-mod-add',
  templateUrl: './mod-add.component.html',
  styleUrls: ['./mod-add.component.scss'],
  providers: [ExamenesService]
})
export class ModAddComponent implements OnInit {

    @Input() public examenes: Array<Examen>;
    @Input() public tipos_examen: Array<TipoExamen>;
    public examen: Examen;
    public exito: boolean;
    public mensaje:string;
    public costoMask = createNumberMask({
        allowDecimal: true,
        prefix: ''
    })
    public maskNames = [/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,];

    closeResult: string;
  
    constructor(private modalService: NgbModal, private examenesService: ExamenesService) { 
    
    }

    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            this.exito = null;
            this.examen.tipo=new TipoExamen("",0,0);            
            this.examen.codigo="";
            this.examen.nombre="";
            this.examen.costo=null;
            
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            this.exito = null;
            this.examen.tipo=new TipoExamen("",0,0);                        
            this.examen.codigo="";
            this.examen.nombre="";
            this.examen.costo=null;
            
        });
    }
  private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
      } else {
          return  `with: ${reason}`;
      }
  }
  ngOnInit() {
    /**muestra los campos vacios solo con el placeholder :)  */
     this.examen=new Examen("","",new TipoExamen("",null,null),null,null);
  }

      onSubmit(){
        //console.log(JSON.stringify(this.examen.tipo));
        this.examenesService.add(this.examen.clone()).subscribe(
            response=>{
                console.log(response);
                if(response.status == "exito"){
                    this.examen.id=response.id;
                    this.examenes.push(this.examen.clone());
                    this.exito=true;
                    this.mensaje=response.mensaje;
                }else{
                    this.exito=false;
                    this.mensaje=response.mensaje;
                }
            },
            error=>{
                if(error!=null) {
                    console.log("Error al enviar la peticion: "+error);
                }
            }
        );
        
        /*borrar las siguientes lineas cuando este la api
        this.examenes.push(this.examen.clone());
        this.exito=true;
        */
    }
      clear(){
        this.examen.tipo=new TipoExamen("",0,0);                    
        this.examen.codigo="";
        this.examen.nombre="";
        this.examen.costo=null;        
        this.exito=null;
    }

}
