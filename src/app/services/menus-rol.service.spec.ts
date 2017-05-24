import { TestBed, inject } from '@angular/core/testing';

import { MenusRolService } from './menus-rol.service';

describe('MenusRolService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenusRolService]
    });
  });

  it('should ...', inject([MenusRolService], (service: MenusRolService) => {
    expect(service).toBeTruthy();
  }));
});
