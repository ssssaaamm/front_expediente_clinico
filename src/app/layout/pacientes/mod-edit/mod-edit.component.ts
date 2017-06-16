import { Component, OnInit, Output, Input, EventEmitter, trigger, transition, style, animate } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { PacientesService } from "app/services/pacientes.service";
import { PaisesService } from "app/services/paises.service";
import { EnfermedadesService } from "app/services/enfermedades.service";
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
  providers: [PacientesService, PaisesService, EnfermedadesService, NgbModal]
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
  public fecha_nacimiento: any;


  public paso1: boolean = true;
  public paso2: boolean = false;
  public paso3: boolean = false;

  public exito: boolean;
  public mensaje: string;
  public maskPhone = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskNames = [/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,];


  closeResult: string;

  constructor(private modalService: NgbModal, private paisesService: PaisesService, private pacientesService: PacientesService, private enfermedadesService: EnfermedadesService) { }

  ngOnInit() {
    //obtenemos las enfermedades el paciente a editar en este modal y su padre y madre pero esto se haria al abrir el modal
    this.paciente_modificado = this.paciente_original.full_clone();
    //console.log(">>>>>>>>>>>>>>>>"+JSON.stringify(this.paciente_modificado.id));

  }

  open(content) {

    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.paciente_modificado = this.paciente_original.full_clone();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.paciente_modificado = this.paciente_original.full_clone();
    });

    //this.rellenarPaises();
    this.rellenarEnfermedades();
    this.rellenarFechaNacimiento();

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
    this.paisesService.listRegions2(this.selectedCountryPadre)
      .map((regions: Array<any>) => {
        return regions;
      })
      .subscribe(res => this.regionesPadre = res);

    this.ciudadesPadre = new Array<any>();

    console.log(this.selectedCountryPadre.nombrePais);
  }

  onChangeRegionPadre() {
    //obtenemos todos las ciudades
    this.paisesService.listCities2(this.selectedRegionPadre)
      .map((cities: Array<any>) => {
        return cities;
      })
      .subscribe(res => this.ciudadesPadre = res);

    console.log(this.selectedRegionPadre.nombreDivision);
  }

  onChangeCiudadPadre() {
    this.paciente_modificado.subdivision = this.selectedCityPadre;
    console.log(this.paciente_modificado.padre.subdivision.nombreSubdivision);
  }

  onChangePaisMadre() {
    //obtenemos todos las regiones
    this.paisesService.listRegions2(this.selectedCountryMadre)
      .map((regions: Array<any>) => {
        return regions;
      })
      .subscribe(res => this.regionesMadre = res);

    this.ciudadesMadre = new Array<any>();

    console.log(this.selectedCountryMadre.nombrePais);
  }

  onChangeRegionMadre() {
    //obtenemos todos las ciudades
    this.paisesService.listCities2(this.selectedRegionMadre)
      .map((cities: Array<any>) => {
        return cities;
      })
      .subscribe(res => this.ciudadesMadre = res);

    console.log(this.selectedRegionMadre.nombreDivision);
  }

  onChangeCiudadMadre() {
    this.paciente_modificado.subdivision = this.selectedCityMadre;
    console.log(this.paciente_modificado.madre.subdivision.nombreSubdivision);
  } 

  //PACIENTES
onChangePaisPaciente() {
    //obtenemos todos las regiones
    this.paisesService.listRegions2(this.selectedCountryPaciente)
      .map((regions: Array<any>) => {
        return regions;
      })
      .subscribe(res => this.regionesPaciente = res);

    this.ciudadesPaciente = new Array<any>();

    console.log(this.selectedCountryPaciente.nombrePais);
  }

  onChangeRegionPaciente() {
    //obtenemos todos las ciudades
    this.paisesService.listCities2(this.selectedRegionPaciente)
      .map((cities: Array<any>) => {
        return cities;
      })
      .subscribe(res => this.ciudadesMadre = res);

    console.log(this.selectedRegionPaciente.nombreDivision);
  }

  onChangeCiudadPaciente() {
    this.paciente_modificado.subdivision = this.selectedCityPaciente;
    console.log(this.paciente_modificado.subdivision.nombreSubdivision);
  } 


onChangePaisResponsable() {
    //obtenemos todos las regiones
    this.paisesService.listRegions2(this.selectedCountryResponsable)
      .map((regions: Array<any>) => {
        return regions;
      })
      .subscribe(res => this.regionesResponsable = res);

    this.ciudadesResponsable = new Array<any>();

    console.log(this.selectedCountryResponsable.responsable.nombrePais);
  }

  onChangeRegionResponsable() {
    //obtenemos todos las ciudades
    this.paisesService.listCities2(this.selectedRegionResponsable)
      .map((cities: Array<any>) => {
        return cities;
      })
      .subscribe(res => this.ciudadesResponsable = res);

    console.log(this.selectedRegionResponsable.nombreDivision);
  }

  onChangeCiudadResponsable() {
    this.paciente_modificado.subdivision = this.selectedCityResponsable;
    console.log(this.paciente_modificado.responsable.subdivision.nombreSubdivision);
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
  onChangeCasadaMadre(){
      if(!this.estaCasada){
        this.paciente_modificado.madre.apellido_casada="";
      }
    }
  
  onChangeCasadaResponsable(){
      if(!this.estaCasada){
        this.paciente_modificado.responsable.apellido_casada="";
      }
    }

  onChangeGeneroResponsable(){
      if(this.paciente_modificado.responsable.genero=="M"){
        this.estaCasada=false;
        this.paciente_modificado.responsable.apellido_casada="";
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
      response => {
        console.log(response);
        if (response.status == "exito") {
          let pos = this.pacientes.indexOf(this.paciente_original);

          // 1) Id del padre creado
          // 2) Id de la madre creada
          // 3) Id del responsable creado
          // 4) id del expediente creado
          // 5) numero del expediente creado
          // 6) Id del usuario creado
          // 7) Username del usuario 
          // 8) Password

          this.paciente_modificado.padre.id = response.idpadre;
          this.paciente_modificado.madre.id = response.idmadre;
          this.paciente_modificado.responsable.id = response.idresponsable;
          this.paciente_modificado.expediente.id = response.idexpediente;
          this.paciente_modificado.expediente.numero_expediente = response.nexpediente;
          this.paciente_modificado.usuario.id = response.idusuario;
          this.paciente_modificado.usuario.id = response.username;
          this.paciente_modificado.usuario.password = response.password;

          this.pacientes[pos] = this.paciente_modificado.full_clone();
          this.paciente_original = this.pacientes[pos];
          this.exito = true;
          this.mensaje = response.mensaje;

        } else {
          this.exito = false;
          this.mensaje = response.mensaje;
        }
      },
      error => {
        if (error != null) {
          console.log("Error al enviar la peticion: " + error);
        }
      }
    );
  }

  private rellenarEnfermedades() {

    //consultar padecimientos de paciente
    let epaciente = [];
    //console.log("EL ID DEL PACIENTE ES: "+this.paciente_modificado.id)
    this.enfermedadesService.getPadecimientosPaciente({"id":this.paciente_modificado.usuario.id})
      .map((enfermedades: Array<any>) => {
        let result: Array<Enfermedad> = new Array<Enfermedad>();
        if (enfermedades) {
          enfermedades.forEach((enfermedad) => {
            result.push(new Enfermedad(enfermedad.codigoEnfermedad, enfermedad.nombreEnfermedad, enfermedad.idEnfermedad));
          });
        }
        return result;
      })
      .subscribe(res => epaciente = res);

    //llenado de prueba
    // epaciente = [
    //   new Enfermedad('01', 'Evola', 1),
    //   new Enfermedad('02', 'Rubiola', 2),
    //   new Enfermedad('04', 'Varicela', 4),
    //   new Enfermedad('05', 'Ramon', 5),
    // ];

    //seleccionamos los padecimientos del paciente
    this.paciente_modificado.enfermedades = new Array<Enfermedad>();
    epaciente.forEach((e) => {
      let matched = this.matchEnfermedad(e.id);
      if (matched != null) {
        this.paciente_modificado.enfermedades.push(matched);
      }
    });



    //consultar padecimientos de padre
    let epadre = [];
    this.enfermedadesService.getPadecimientosPadre({"id":this.paciente_modificado.padre.id})
      .map((enfermedades: Array<any>) => {
        let result: Array<Enfermedad> = new Array<Enfermedad>();
        if (enfermedades) {
          enfermedades.forEach((enfermedad) => {
            result.push(new Enfermedad(enfermedad.codigoEnfermedad, enfermedad.nombreEnfermedad, enfermedad.idEnfermedad));
          });
        }
        return result;
      })
      .subscribe(res => epadre = res);

    //llenado de prueba
    // epadre = [
    //   new Enfermedad('01', 'Evola', 1),
    //   new Enfermedad('02', 'Rubiola', 2),
    // ];

    //seleccionamos los padecimientos del padre
    this.paciente_modificado.padre.enfermedades = new Array<Enfermedad>();
    epadre.forEach((e) => {
      let matched = this.matchEnfermedad(e.id);
      if (matched != null) {
        this.paciente_modificado.padre.enfermedades.push(matched);
      }
    });



    //consultar padecimientos de madre
    let emadre = [];
    this.enfermedadesService.getPadecimientosPadre({"id":this.paciente_modificado.madre.id})
      .map((enfermedades: Array<any>) => {
        let result: Array<Enfermedad> = new Array<Enfermedad>();
        if (enfermedades) {
          enfermedades.forEach((enfermedad) => {
            result.push(new Enfermedad(enfermedad.codigoEnfermedad, enfermedad.nombreEnfermedad, enfermedad.idEnfermedad));
          });
        }
        return result;
      })
      .subscribe(res => emadre = res);

    //llenado de prueba
    // emadre = [
    //   new Enfermedad('01', 'Evola', 1),
    //   new Enfermedad('02', 'Rubiola', 2),
    // ];

    //seleccionamos los padecimientos del Padre
    this.paciente_modificado.padre.enfermedades = new Array<Enfermedad>();
    epadre.forEach((e) => {
      let matched = this.matchEnfermedad(e.id);
      if (matched != null) {
        this.paciente_modificado.padre.enfermedades.push(matched);
      }
    });

    //seleccionamos los padecimientos del madre
    this.paciente_modificado.madre.enfermedades = new Array<Enfermedad>();
    emadre.forEach((e) => {
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
      if (this.paciente_modificado.subdivision.idDivision.idPais.idPais == pais.idPais) {
        this.selectedCountryPaciente = pais;
        this.onChangePaisPaciente();
      }
    });

    setTimeout(() => {
      this.regionesPaciente.forEach((region) => {
        if (this.paciente_modificado.subdivision.idDivision.idDivision == region.idDivision) {
          this.selectedRegionPaciente = region;
          this.onChangeRegionPaciente();
        }
      });

      setTimeout(() => {
        this.ciudadesPaciente.forEach((ciudad) => {
          if (this.paciente_modificado.subdivision.subdivision.idSubdivision == ciudad.idSubdivision) {
            this.selectedCityPaciente = ciudad;
            this.onChangeCiudadPaciente();
          }
        });
      }, 1500);
    }, 1500);

    

  //   // padre
     
    this.paises.forEach((pais) => {
      if (this.paciente_modificado.padre.subdivision.idDivision.idPais.idPais == pais.idPais) {
        this.selectedCountryPadre = pais;
        this.onChangePaisPadre();
      }
    });

    setTimeout(() => {
      this.regionesPaciente.forEach((region) => {
        if (this.paciente_modificado.padre.subdivision.idDivision.idDivision == region.idDivision) {
          this.selectedRegionPadre = region;
          this.onChangeRegionPadre();
        }
      });

      setTimeout(() => {
        this.ciudadesPaciente.forEach((ciudad) => {
          if (this.paciente_modificado.padre.subdivision.subdivision.idSubdivision == ciudad.idSubdivision) {
            this.selectedCityPadre.padre = ciudad;
            this.onChangeCiudadPadre();
          }
        });
      }, 1500);
    }, 1500);
  


  // Madre
     
    this.paises.forEach((pais) => {
      if (this.paciente_modificado.madre.subdivision.idDivision.idPais.idPais == pais.idPais) {
        this.selectedCountryMadre = pais;
        this.onChangePaisPaciente();
      }
    });

    setTimeout(() => {
      this.regionesPaciente.forEach((region) => {
        if (this.paciente_modificado.madre.subdivision.idDivision.idDivision == region.idDivision) {
          this.selectedRegionMadre = region;
          this.onChangeRegionMadre();
        }
      });

      setTimeout(() => {
        this.ciudadesPaciente.forEach((ciudad) => {
          if (this.paciente_modificado.madre.subdivision.subdivision.idSubdivision == ciudad.idSubdivision) {
            this.selectedCityPaciente.madre = ciudad;
            this.onChangeCiudadMadre();
          }
        });
      }, 1500);
    }, 1500);



  // Responsables
     
    this.paises.forEach((pais) => {
      if (this.paciente_modificado.responsable.subdivision.idDivision.idPais.idPais == pais.idPais) {
        this.selectedCountryMadre = pais;
        this.onChangePaisResponsable();
      }
    });

    setTimeout(() => {
      this.regionesPaciente.forEach((region) => {
        if (this.paciente_modificado.responsable.subdivision.idDivision.idDivision == region.idDivision) {
          this.selectedRegionMadre = region;
          this.onChangeRegionResponsable();
        }
      });

      setTimeout(() => {
        this.ciudadesPaciente.forEach((ciudad) => {
          if (this.paciente_modificado.responsable.subdivision.subdivision.idSubdivision == ciudad.idSubdivision) {
            this.selectedCityPaciente.responsable = ciudad;
            this.onChangeCiudadResponsable();
          }
        });
      }, 1500);
    }, 1500);
  }

  rellenarFechaNacimiento() {
    this.fecha_nacimiento={};
    this.fecha_nacimiento.year = this.paciente_modificado.anio_nacimiento;
    this.fecha_nacimiento.month = this.paciente_modificado.mes_nacimiento;
    this.fecha_nacimiento.day = this.paciente_modificado.dia_nacimiento;
  }


}
