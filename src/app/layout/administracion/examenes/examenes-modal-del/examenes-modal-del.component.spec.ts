import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenesModalDelComponent } from './examenes-modal-del.component';

describe('ExamenesModalDelComponent', () => {
  let component: ExamenesModalDelComponent;
  let fixture: ComponentFixture<ExamenesModalDelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamenesModalDelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenesModalDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
