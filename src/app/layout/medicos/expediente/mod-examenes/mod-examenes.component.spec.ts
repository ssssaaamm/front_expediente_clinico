import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModExamenesComponent } from './mod-examenes.component';

describe('ModExamenesComponent', () => {
  let component: ModExamenesComponent;
  let fixture: ComponentFixture<ModExamenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModExamenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModExamenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
