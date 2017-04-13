import { TestBed, inject } from '@angular/core/testing';

import { EnfermedadesService } from './enfermedades.service';

describe('EnfermedadesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnfermedadesService]
    });
  });

  it('should ...', inject([EnfermedadesService], (service: EnfermedadesService) => {
    expect(service).toBeTruthy();
  }));
});
