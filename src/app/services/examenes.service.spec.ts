import { TestBed, inject } from '@angular/core/testing';

import { ExamenesService } from './examenes.service';

describe('ExamenesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExamenesService]
    });
  });

  it('should ...', inject([ExamenesService], (service: ExamenesService) => {
    expect(service).toBeTruthy();
  }));
});
