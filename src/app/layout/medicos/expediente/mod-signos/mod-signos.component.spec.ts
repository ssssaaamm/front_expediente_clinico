import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModSignosComponent } from './mod-signos.component';

describe('ModSignosComponent', () => {
  let component: ModSignosComponent;
  let fixture: ComponentFixture<ModSignosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModSignosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModSignosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
