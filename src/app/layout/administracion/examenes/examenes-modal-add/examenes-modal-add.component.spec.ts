import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenesModalAddComponent } from './examenes-modal-add.component';

describe('ExamenesModalAddComponent', () => {
  let component: ExamenesModalAddComponent;
  let fixture: ComponentFixture<ExamenesModalAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamenesModalAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenesModalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
