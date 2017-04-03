import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadesModalDelComponent } from './especialidades-modal-del.component';

describe('EspecialidadesModalDelComponent', () => {
  let component: EspecialidadesModalDelComponent;
  let fixture: ComponentFixture<EspecialidadesModalDelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspecialidadesModalDelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialidadesModalDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
