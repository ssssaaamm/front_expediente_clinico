import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadecimientosComponent } from './padecimientos.component';

describe('PadecimientosComponent', () => {
  let component: PadecimientosComponent;
  let fixture: ComponentFixture<PadecimientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadecimientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadecimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
