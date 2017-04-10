import { TestBed, inject } from '@angular/core/testing';

import { EspecialidadesService } from './especialidades.service';

describe('EspecialidadesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EspecialidadesService]
    });
  });

  it('should ...', inject([EspecialidadesService], (service: EspecialidadesService) => {
    expect(service).toBeTruthy();
  }));
});
