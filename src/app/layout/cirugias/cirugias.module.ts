import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { TextMaskModule } from 'angular2-text-mask';
import { CirugiasRoutingModule } from './cirugias-routing.module';
import { CirugiasComponent } from './cirugias.component';
import { ModAddComponent } from './mod-add/mod-add.component';
import { ModEditComponent } from './mod-edit/mod-edit.component';
import { ModDelComponent } from './mod-del/mod-del.component';
import { TextMaskModule } from 'angular2-text-mask';


@NgModule({
  imports: [
    CommonModule,
    CirugiasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    TextMaskModule,
  ],
  declarations: [CirugiasComponent, ModAddComponent, ModEditComponent, ModDelComponent]
})
export class CirugiasModule { }
