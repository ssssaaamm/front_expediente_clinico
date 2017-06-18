import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModCirugiasComponent } from './mod-cirugias.component';

describe('ModCirugiasComponent', () => {
  let component: ModCirugiasComponent;
  let fixture: ComponentFixture<ModCirugiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModCirugiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModCirugiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
