import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiagnosticoComponent } from './add-diagnostico.component';

describe('AddDiagnosticoComponent', () => {
  let component: AddDiagnosticoComponent;
  let fixture: ComponentFixture<AddDiagnosticoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDiagnosticoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDiagnosticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
