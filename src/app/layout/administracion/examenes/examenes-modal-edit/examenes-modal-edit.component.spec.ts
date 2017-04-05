import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenesModalEditComponent } from './examenes-modal-edit.component';

describe('ExamenesModalEditComponent', () => {
  let component: ExamenesModalEditComponent;
  let fixture: ComponentFixture<ExamenesModalEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamenesModalEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenesModalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
