import { TestBed, inject } from '@angular/core/testing';

import { ProcedimientosService } from './procedimientos.service';

describe('ProcedimientosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcedimientosService]
    });
  });

  it('should ...', inject([ProcedimientosService], (service: ProcedimientosService) => {
    expect(service).toBeTruthy();
  }));
});
