import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicosModalDelComponent } from './medicos-modal-del.component';

describe('MedicosModalDelComponent', () => {
  let component: MedicosModalDelComponent;
  let fixture: ComponentFixture<MedicosModalDelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicosModalDelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicosModalDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
