import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentosModalAddComponent } from './medicamentos-modal-add.component';

describe('MedicamentosModalAddComponent', () => {
  let component: MedicamentosModalAddComponent;
  let fixture: ComponentFixture<MedicamentosModalAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicamentosModalAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentosModalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
