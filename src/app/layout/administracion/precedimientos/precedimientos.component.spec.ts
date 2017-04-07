import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecedimientosComponent } from './precedimientos.component';

describe('PrecedimientosComponent', () => {
  let component: PrecedimientosComponent;
  let fixture: ComponentFixture<PrecedimientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrecedimientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecedimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
