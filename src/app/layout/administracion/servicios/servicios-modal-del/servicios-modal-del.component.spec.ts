import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosModalDelComponent } from './servicios-modal-del.component';

describe('ServiciosModalDelComponent', () => {
  let component: ServiciosModalDelComponent;
  let fixture: ComponentFixture<ServiciosModalDelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiciosModalDelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosModalDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
