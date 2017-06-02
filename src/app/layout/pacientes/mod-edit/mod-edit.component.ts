import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mod-edit',
  templateUrl: './mod-edit.component.html',
  styleUrls: ['./mod-edit.component.scss']
})
export class ModEditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //obtenemos las enfermedades el paciente a editar en este modal y su padre y madre pero esto se haria al abrir el modal
  }

}
