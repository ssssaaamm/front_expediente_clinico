import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModDetalleComponent } from './mod-detalle.component';

describe('ModDetalleComponent', () => {
  let component: ModDetalleComponent;
  let fixture: ComponentFixture<ModDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
