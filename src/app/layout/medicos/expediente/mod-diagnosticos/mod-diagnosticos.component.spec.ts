import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModDiagnosticosComponent } from './mod-diagnosticos.component';

describe('ModDiagnosticosComponent', () => {
  let component: ModDiagnosticosComponent;
  let fixture: ComponentFixture<ModDiagnosticosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModDiagnosticosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModDiagnosticosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
