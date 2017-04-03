import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicosModalEditComponent } from './medicos-modal-edit.component';

describe('MedicosModalEditComponent', () => {
  let component: MedicosModalEditComponent;
  let fixture: ComponentFixture<MedicosModalEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicosModalEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicosModalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
