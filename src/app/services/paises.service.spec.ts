import { TestBed, inject } from '@angular/core/testing';

import { PaisesService } from './paises.service';

describe('PaisesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaisesService]
    });
  });

  it('should ...', inject([PaisesService], (service: PaisesService) => {
    expect(service).toBeTruthy();
  }));
});
