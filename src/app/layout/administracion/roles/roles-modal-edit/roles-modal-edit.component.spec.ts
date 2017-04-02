import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesModalEditComponent } from './roles-modal-edit.component';

describe('RolesModalEditComponent', () => {
  let component: RolesModalEditComponent;
  let fixture: ComponentFixture<RolesModalEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolesModalEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesModalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
