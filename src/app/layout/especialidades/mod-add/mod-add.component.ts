import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Especialidad } from '../../../models/especialidad';

@Component({
  selector: 'app-mod-add',
  templateUrl: './mod-add.component.html',
  styleUrls: ['./mod-add.component.scss']
})
export class ModAddComponent implements OnInit {
  
  @Output() action: EventEmitter<Especialidad> = new EventEmitter<Especialidad>();
  public especialidad: Especialidad;
  closeResult: string;
  
  constructor(private modalService: NgbModal) {  }
   


    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
      this.especialidad=new Especialidad("Codigo","Nombre Especialidad");
  }

  onSubmit(){
    this.action.emit(this.especialidad);
  }

}
