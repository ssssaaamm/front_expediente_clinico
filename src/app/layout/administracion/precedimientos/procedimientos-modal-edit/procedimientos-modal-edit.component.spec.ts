import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedimientosModalEditComponent } from './procedimientos-modal-edit.component';

describe('ProcedimientosModalEditComponent', () => {
  let component: ProcedimientosModalEditComponent;
  let fixture: ComponentFixture<ProcedimientosModalEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedimientosModalEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedimientosModalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
