import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosModalEditComponent } from './usuarios-modal-edit.component';

describe('UsuariosModalEditComponent', () => {
  let component: UsuariosModalEditComponent;
  let fixture: ComponentFixture<UsuariosModalEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosModalEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosModalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
