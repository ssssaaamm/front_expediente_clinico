import { TestBed, inject } from '@angular/core/testing';

import { CitasService } from './citas.service';

describe('CitasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CitasService]
    });
  });

  it('should ...', inject([CitasService], (service: CitasService) => {
    expect(service).toBeTruthy();
  }));
});
