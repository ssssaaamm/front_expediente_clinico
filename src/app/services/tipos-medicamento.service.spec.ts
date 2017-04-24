import { TestBed, inject } from '@angular/core/testing';

import { TiposMedicamentoService } from './tipos-medicamento.service';

describe('TiposMedicamentoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TiposMedicamentoService]
    });
  });

  it('should ...', inject([TiposMedicamentoService], (service: TiposMedicamentoService) => {
    expect(service).toBeTruthy();
  }));
});
