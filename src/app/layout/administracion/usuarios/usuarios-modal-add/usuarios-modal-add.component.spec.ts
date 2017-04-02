import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosModalAddComponent } from './usuarios-modal-add.component';

describe('UsuariosModalAddComponent', () => {
  let component: UsuariosModalAddComponent;
  let fixture: ComponentFixture<UsuariosModalAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosModalAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosModalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
