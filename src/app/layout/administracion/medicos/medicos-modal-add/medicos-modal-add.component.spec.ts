import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicosModalAddComponent } from './medicos-modal-add.component';

describe('MedicosModalAddComponent', () => {
  let component: MedicosModalAddComponent;
  let fixture: ComponentFixture<MedicosModalAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicosModalAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicosModalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
