import { TestBed, inject } from '@angular/core/testing';

import { PacientesService } from './pacientes.service';

describe('PacientesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PacientesService]
    });
  });

  it('should ...', inject([PacientesService], (service: PacientesService) => {
    expect(service).toBeTruthy();
  }));
});
