import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosModalDelComponent } from './usuarios-modal-del.component';

describe('UsuariosModalDelComponent', () => {
  let component: UsuariosModalDelComponent;
  let fixture: ComponentFixture<UsuariosModalDelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosModalDelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosModalDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
