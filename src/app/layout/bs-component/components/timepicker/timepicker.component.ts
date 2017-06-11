import { Component } from '@angular/core';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-timepicker',
    templateUrl: './timepicker.component.html',
    styleUrls: ['./timepicker.component.scss']
})
export class TimepickerComponent {

    public isReservada=false;
    
    defaultTime = {hour: 13, minute: 30};
    meridianTime = {hour: 13, minute: 30};
    meridian = true;

    SecondsTime: NgbTimeStruct = {hour: 13, minute: 30, second: 30};
    seconds = true;

    customTime: NgbTimeStruct = {hour: 13, minute: 30, second: 0};
    hourStep = 1;
    minuteStep = 15;
    secondStep = 30;

    toggleSeconds() {
        this.seconds = !this.seconds;
    }

    toggleMeridian() {
        this.meridian = !this.meridian;
    }

    validarHora(event){
        if(event.hour==14 && event.minute==0){
            console.log("la hora: "+event.hour+":"+event.minute+" esta reservada");
            this.isReservada=true;
        }else{
            this.isReservada=false;
        }
    }
}
