import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModConsultasComponent } from './mod-consultas.component';

describe('ModConsultasComponent', () => {
  let component: ModConsultasComponent;
  let fixture: ComponentFixture<ModConsultasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModConsultasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModConsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
