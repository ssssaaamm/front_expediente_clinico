import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentosModalEditComponent } from './medicamentos-modal-edit.component';

describe('MedicamentosModalEditComponent', () => {
  let component: MedicamentosModalEditComponent;
  let fixture: ComponentFixture<MedicamentosModalEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicamentosModalEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentosModalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
