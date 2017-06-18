import { TestBed, inject } from '@angular/core/testing';

import { PeticionesService } from './peticiones.service';

describe('PeticionesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PeticionesService]
    });
  });

  it('should ...', inject([PeticionesService], (service: PeticionesService) => {
    expect(service).toBeTruthy();
  }));
});
