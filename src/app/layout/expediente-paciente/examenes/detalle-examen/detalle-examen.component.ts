import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-detalle-examen',
  templateUrl: './detalle-examen.component.html',
  styleUrls: ['./detalle-examen.component.scss']
})
export class DetalleExamenComponent implements OnInit {
  @Input() asignacion_examen: any;
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
