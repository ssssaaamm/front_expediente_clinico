import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentosModalDelComponent } from './medicamentos-modal-del.component';

describe('MedicamentosModalDelComponent', () => {
  let component: MedicamentosModalDelComponent;
  let fixture: ComponentFixture<MedicamentosModalDelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicamentosModalDelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentosModalDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
