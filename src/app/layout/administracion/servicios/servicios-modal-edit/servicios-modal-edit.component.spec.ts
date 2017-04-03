import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosModalEditComponent } from './servicios-modal-edit.component';

describe('ServiciosModalEditComponent', () => {
  let component: ServiciosModalEditComponent;
  let fixture: ComponentFixture<ServiciosModalEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiciosModalEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosModalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
