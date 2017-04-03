import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadesModalEditComponent } from './especialidades-modal-edit.component';

describe('EspecialidadesModalEditComponent', () => {
  let component: EspecialidadesModalEditComponent;
  let fixture: ComponentFixture<EspecialidadesModalEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspecialidadesModalEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialidadesModalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
