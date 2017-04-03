import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadesModalAddComponent } from './especialidades-modal-add.component';

describe('EspecialidadesModalAddComponent', () => {
  let component: EspecialidadesModalAddComponent;
  let fixture: ComponentFixture<EspecialidadesModalAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspecialidadesModalAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialidadesModalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
