import { TestBed, inject } from '@angular/core/testing';

import { DiasService } from './dias.service';

describe('DiasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiasService]
    });
  });

  it('should ...', inject([DiasService], (service: DiasService) => {
    expect(service).toBeTruthy();
  }));
});
