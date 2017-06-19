import { Component, OnInit, Input } from '@angular/core';
import { NgbModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-mod-detalle',
  templateUrl: './mod-detalle.component.html',
  styleUrls: ['./mod-detalle.component.scss']
})
export class ModDetalleComponent implements OnInit {

 @Input() asignacion_consulta: any;
  public exito: boolean;
  public mensaje: string;
  closeResult: string;

  constructor(private modalService: NgbModal) { }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.clearFields();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.clearFields();
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  ngOnInit() {
  }

  private clearFields() {

  }
}
