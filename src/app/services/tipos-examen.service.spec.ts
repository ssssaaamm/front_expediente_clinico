import { TestBed, inject } from '@angular/core/testing';

import { TiposExamenService } from './tipos-examen.service';

describe('TiposExamenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TiposExamenService]
    });
  });

  it('should ...', inject([TiposExamenService], (service: TiposExamenService) => {
    expect(service).toBeTruthy();
  }));
});
