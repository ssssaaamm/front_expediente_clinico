import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedimientosModalAddComponent } from './procedimientos-modal-add.component';

describe('ProcedimientosModalAddComponent', () => {
  let component: ProcedimientosModalAddComponent;
  let fixture: ComponentFixture<ProcedimientosModalAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedimientosModalAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedimientosModalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
