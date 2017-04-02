import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDelComponent } from './modal-del.component';

describe('ModalDelComponent', () => {
  let component: ModalDelComponent;
  let fixture: ComponentFixture<ModalDelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
