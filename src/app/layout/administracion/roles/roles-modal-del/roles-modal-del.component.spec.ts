import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesModalDelComponent } from './roles-modal-del.component';

describe('RolesModalDelComponent', () => {
  let component: RolesModalDelComponent;
  let fixture: ComponentFixture<RolesModalDelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolesModalDelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesModalDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
