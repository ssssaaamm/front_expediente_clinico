import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModDatosComponent } from './mod-datos.component';

describe('ModDatosComponent', () => {
  let component: ModDatosComponent;
  let fixture: ComponentFixture<ModDatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModDatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
