import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent, SidebarComponent, SpinnerComponent} from '../shared';



@NgModule({
    imports: [
        CommonModule,
        NgbDropdownModule.forRoot(),
        LayoutRoutingModule,
    ],
    declarations: [
        LayoutComponent,
        HeaderComponent,
        SidebarComponent,
        SpinnerComponent
    ]
})
export class LayoutModule { }
