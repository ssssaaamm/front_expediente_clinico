import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosModalAddComponent } from './servicios-modal-add.component';

describe('ServiciosModalAddComponent', () => {
  let component: ServiciosModalAddComponent;
  let fixture: ComponentFixture<ServiciosModalAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiciosModalAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosModalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
