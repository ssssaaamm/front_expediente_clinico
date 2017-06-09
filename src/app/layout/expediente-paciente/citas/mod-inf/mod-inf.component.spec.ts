import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModInfComponent } from './mod-inf.component';

describe('ModInfComponent', () => {
  let component: ModInfComponent;
  let fixture: ComponentFixture<ModInfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModInfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModInfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
