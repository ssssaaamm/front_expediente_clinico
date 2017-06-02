import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModDelComponent } from './mod-del.component';

describe('ModDelComponent', () => {
  let component: ModDelComponent;
  let fixture: ComponentFixture<ModDelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModDelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
