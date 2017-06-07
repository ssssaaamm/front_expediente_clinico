import { Component, OnInit, Output, Input, EventEmitter, trigger, transition, style, animate } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { PacientesService } from "app/services/pacientes.service";
import { PaisesService } from "app/services/paises.service";
import { Enfermedad } from "app/models/enfermedad";
import { Paciente } from "app/models/paciente";

@Component({
  selector: 'app-mod-edit',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ transform: 'translateX(100%)', opacity: 0 }),
          animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
        ]),
        // transition(':leave', [
        //   style({transform: 'translateX(0)', opacity: 1}),
        //   animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        // ])
      ]
    )
  ],
  templateUrl: './mod-edit.component.html',
  styleUrls: ['./mod-edit.component.scss'],
  providers: [PacientesService, PaisesService, NgbModal]
})
export class ModEditComponent implements OnInit {

  @Input() public enfermedades: Array<Enfermedad>;//<--- todas las enfermedade
  @Input() public paises: Array<any>;//<--- todos los paises
  @Input() public pacientes: Array<any>;//<--- todos los paises
  @Input() public paciente_original: Paciente; //<--- paciente original.
  @Input() public paciente_modificado: Paciente; //<--- paciente original.

  //todas las regiones de los paises
  public regionesPadre: Array<any> = new Array<any>();//<--sera pasado al componente add y edit
  public regionesMadre: Array<any> = new Array<any>();//<--sera pasado al componente add y edit
  public regionesResponsable: Array<any> = new Array<any>();//<--sera pasado al componente add y edit
  public regionesPaciente: Array<any> = new Array<any>();//<--sera pasado al componente add y edit
  //todas las ciudades de las regiones
  public ciudadesPadre: Array<any> = new Array<any>();//<--sera pasado al componente add y edit
  public ciudadesMadre: Array<any> = new Array<any>();//<--sera pasado al componente add y edit
  public ciudadesResponsable: Array<any> = new Array<any>();//<--sera pasado al componente add y edit
  public ciudadesPaciente: Array<any> = new Array<any>();//<--sera pasado al componente add y edit

  public selectedCountryPadre: any;
  public selectedRegionPadre: any;
  public selectedCityPadre: any;
  public selectedCountryMadre: any;
  public selectedRegionMadre: any;
  public selectedCityMadre: any;
  public selectedCountryPaciente: any;
  public selectedRegionPaciente: any;
  public selectedCityPaciente: any;
  public selectedCountryResponsable: any;
  public selectedRegionResponsable: any;
  public selectedCityResponsable: any;
  public estaCasada: boolean = false;

  public paso1: boolean = true;
  public paso2: boolean = false;
  public paso3: boolean = false;

  public exito: boolean;
  public mensaje: string;

  closeResult: string;

  constructor(private modalService: NgbModal, private paisesService: PaisesService, private pacientesService: PacientesService) { }

  ngOnInit() {
    //obtenemos las enfermedades el paciente a editar en este modal y su padre y madre pero esto se haria al abrir el modal
    this.paciente_modificado = this.paciente_original.full_clone();

  }

  open(content) {

    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.paciente_modificado = this.paciente_original.full_clone();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.paciente_modificado = this.paciente_original.full_clone();
    });

    this.rellenarPaises();
    this.rellenarEnfermedades();

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

  onChangePaisPadre() {
    //obtenemos todos las regiones
    this.paisesService.listRegions(this.selectedCountryPadre.code)
      .map((regions: Array<any>) => {
        return regions;
      })
      .subscribe(res => this.regionesPadre = res);

    this.ciudadesPadre = new Array<any>();

    console.log(this.selectedCountryPadre.name);
    this.paciente_modificado.padre.pais = this.selectedCountryPadre.name;
  }

  onChangeRegionPadre() {
    //obtenemos todos las ciudades
    this.paisesService.listCities(this.selectedCountryPadre.code, this.selectedRegionPadre.region)
      .map((cities: Array<any>) => {
        return cities;
      })
      .subscribe(res => this.ciudadesPadre = res);

    console.log(this.selectedRegionPadre.region);
    this.paciente_modificado.padre.division = this.selectedRegionPadre.region;
  }

  onChangeCiudadPadre() {
    console.log(this.selectedCityPadre.city);
    this.paciente_modificado.padre.subdivision = this.selectedCityPadre.city;
  }

  onChangePaisMadre() {
    //obtenemos todos las regiones
    this.paisesService.listRegions(this.selectedCountryMadre.code)
      .map((regions: Array<any>) => {
        return regions;
      })
      .subscribe(res => this.regionesMadre = res);

    this.ciudadesMadre = new Array<any>();

    console.log(this.selectedCountryMadre.name);
    this.paciente_modificado.madre.pais = this.selectedCountryMadre.name;
  }

  onChangeRegionMadre() {
    //obtenemos todos las ciudades
    this.paisesService.listCities(this.selectedCountryMadre.code, this.selectedRegionMadre.region)
      .map((cities: Array<any>) => {
        return cities;
      })
      .subscribe(res => this.ciudadesMadre = res);

    console.log(this.selectedRegionMadre.region);
    this.paciente_modificado.madre.division = this.selectedRegionMadre.region;
  }

  onChangeCiudadMadre() {
    console.log(this.selectedCityMadre.city);
    this.paciente_modificado.madre.subdivision = this.selectedCityMadre.city;
  }

  onChangePaisPaciente() {
    //obtenemos todos las regiones
    this.paisesService.listRegions(this.selectedCountryPaciente.code)
      .map((regions: Array<any>) => {
        return regions;
      })
      .subscribe(res => this.regionesPaciente = res);

    this.ciudadesPaciente = new Array<any>();

    console.log(this.selectedCountryPaciente.name);
    this.paciente_modificado.pais = this.selectedCountryPaciente.name;
  }

  onChangeRegionPaciente() {
    //obtenemos todos las ciudades
    this.paisesService.listCities(this.selectedCountryPaciente.code, this.selectedRegionPaciente.region)
      .map((cities: Array<any>) => {
        return cities;
      })
      .subscribe(res => this.ciudadesPaciente = res);

    console.log(this.selectedRegionPaciente.region);
    this.paciente_modificado.division = this.selectedRegionPaciente.region;
  }

  onChangeCiudadPaciente() {
    console.log(this.selectedCityPaciente.city);
    this.paciente_modificado.subdivision = this.selectedCityPaciente.city;
  }

  onChangePaisResponsable() {
    //obtenemos todos las regiones
    this.paisesService.listRegions(this.selectedCountryResponsable.code)
      .map((regions: Array<any>) => {
        return regions;
      })
      .subscribe(res => this.regionesResponsable = res);

    this.ciudadesResponsable = new Array<any>();

    console.log(this.selectedCountryResponsable.name);
    this.paciente_modificado.responsable.pais = this.selectedCountryResponsable.name;
  }

  onChangeRegionResponsable() {
    //obtenemos todos las ciudades
    this.paisesService.listCities(this.selectedCountryResponsable.code, this.selectedRegionResponsable.region)
      .map((cities: Array<any>) => {
        return cities;
      })
      .subscribe(res => this.ciudadesResponsable = res);

    console.log(this.selectedRegionResponsable.region);
    this.paciente_modificado.responsable.division = this.selectedRegionResponsable.region;
  }

  onChangeCiudadResponsable() {
    console.log(this.selectedCityResponsable.city);
    this.paciente_modificado.responsable.subdivision = this.selectedCityResponsable.city;
  }

  onChangeCasada() {
    if (!this.estaCasada) {
      this.paciente_modificado.apellido_casada = "";
    }
  }

  onChangeGenero() {
    if (this.paciente_modificado.genero == "M") {
      this.estaCasada = false;
      this.paciente_modificado.apellido_casada = "";
    }
  }

  switchPaso(paso: number) {
    switch (paso) {
      case 1:
        this.paso1 = true;
        this.paso2 = false;
        this.paso3 = false;
        break;
      case 2:
        this.paso1 = false;
        this.paso2 = true;
        this.paso3 = false;
        break;
      default:
        this.paso1 = false;
        this.paso2 = false;
        this.paso3 = true;
        break;
    }
  }

  onSubmit() {
    this.pacientesService.edit(this.paciente_modificado.clone()).subscribe(
          response=>{
              console.log(response);
              if(response.status == "exito"){
                  let pos = this.pacientes.indexOf(this.paciente_original);
                  this.pacientes[pos]=this.paciente_modificado.full_clone();
                  this.paciente_original=this.pacientes[pos];
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
  }

  private rellenarEnfermedades() {
    //consultar padecimientos de paciente
    let obtenidas = [
      new Enfermedad('01', 'Evola', 1),
      new Enfermedad('02', 'Rubiola', 2),
      new Enfermedad('04', 'Varicela', 4),
      new Enfermedad('05', 'Ramon', 5),
    ];

    //seleccionamos los padecimientos del paciente
    this.paciente_modificado.enfermedades = new Array<Enfermedad>();
    obtenidas.forEach((e) => {
      let matched = this.matchEnfermedad(e.id);
      if (matched != null) {
        this.paciente_modificado.enfermedades.push(matched);
      }
    });



    //consultar padecimientos de padre

    //seleccionamos los padecimientos del padre
    this.paciente_modificado.padre.enfermedades = new Array<Enfermedad>();
    obtenidas.forEach((e) => {
      let matched = this.matchEnfermedad(e.id);
      if (matched != null) {
        this.paciente_modificado.padre.enfermedades.push(matched);
      }
    });



    //consultar padecimientos de madre

    //seleccionamos los padecimientos del madre
    this.paciente_modificado.madre.enfermedades = new Array<Enfermedad>();
    obtenidas.forEach((e) => {
      let matched = this.matchEnfermedad(e.id);
      if (matched != null) {
        this.paciente_modificado.madre.enfermedades.push(matched);
      }
    });

  }

  private matchEnfermedad(id: number): Enfermedad {
    let returning: Enfermedad = null;
    this.enfermedades.forEach((enfermedad) => {
      if (enfermedad.id == id) {
        returning = enfermedad;
      }
    });
    return returning;

    //
  }

  private rellenarPaises() {

    // pacientes
    this.paises.forEach((pais) => {
      if (this.paciente_modificado.pais == pais.name) {
        this.selectedCountryPaciente = pais;
        this.onChangePaisPaciente();
      }
    });

    setTimeout(() => {
      this.regionesPaciente.forEach((region) => {
        if (this.paciente_modificado.division == region.region) {
          this.selectedRegionPaciente = region;
          this.onChangeRegionPaciente();
        }
      });

      setTimeout(() => {
        this.ciudadesPaciente.forEach((ciudad) => {
          if (this.paciente_modificado.subdivision == ciudad.city) {
            this.selectedCityPaciente = ciudad;
            this.onChangeCiudadPaciente();
          }
        });
      }, 1500);
    }, 1500);

    // padre
    this.paises.forEach((pais) => {
      if (this.paciente_modificado.padre.pais == pais.name) {
        this.selectedCountryPadre = pais;
        this.onChangePaisPadre();
      }
    });

    setTimeout(() => {
      this.regionesPadre.forEach((region) => {
        if (this.paciente_modificado.padre.division == region.region) {
          this.selectedRegionPadre = region;
          this.onChangeRegionPadre();
        }
      });

      setTimeout(() => {
        this.ciudadesPadre.forEach((ciudad) => {
          if (this.paciente_modificado.padre.subdivision == ciudad.city) {
            this.selectedCityPadre = ciudad;
            this.onChangeCiudadPadre();
          }
        });
      }, 1500);
    }, 1500);

    // madre
    this.paises.forEach((pais) => {
      if (this.paciente_modificado.madre.pais == pais.name) {
        this.selectedCountryMadre = pais;
        this.onChangePaisMadre();
      }
    });

    setTimeout(() => {
      this.regionesMadre.forEach((region) => {
        if (this.paciente_modificado.madre.division == region.region) {
          this.selectedRegionMadre = region;
          this.onChangeRegionMadre();
        }
      });

      setTimeout(() => {
        this.ciudadesMadre.forEach((ciudad) => {
          if (this.paciente_modificado.madre.subdivision == ciudad.city) {
            this.selectedCityMadre = ciudad;
            this.onChangeCiudadMadre();
          }
        });
      }, 1500);
    }, 1500);


    // responsable
    this.paises.forEach((pais) => {
      if (this.paciente_modificado.responsable.pais == pais.name) {
        this.selectedCountryResponsable = pais;
        this.onChangePaisResponsable();
      }
    });

    setTimeout(() => {
      this.regionesResponsable.forEach((region) => {
        if (this.paciente_modificado.responsable.division == region.region) {
          this.selectedRegionResponsable = region;
          this.onChangeRegionResponsable();
        }
      });

      setTimeout(() => {
        this.ciudadesResponsable.forEach((ciudad) => {
          if (this.paciente_modificado.responsable.subdivision == ciudad.city) {
            this.selectedCityResponsable = ciudad;
            this.onChangeCiudadResponsable();
          }
        });
      }, 1500);
    }, 1500);



  }


}
