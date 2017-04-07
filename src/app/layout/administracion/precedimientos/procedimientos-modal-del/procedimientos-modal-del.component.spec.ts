import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedimientosModalDelComponent } from './procedimientos-modal-del.component';

describe('ProcedimientosModalDelComponent', () => {
  let component: ProcedimientosModalDelComponent;
  let fixture: ComponentFixture<ProcedimientosModalDelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedimientosModalDelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedimientosModalDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
