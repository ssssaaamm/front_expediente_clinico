import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesModalAddComponent } from './roles-modal-add.component';

describe('RolesModalAddComponent', () => {
  let component: RolesModalAddComponent;
  let fixture: ComponentFixture<RolesModalAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolesModalAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesModalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
