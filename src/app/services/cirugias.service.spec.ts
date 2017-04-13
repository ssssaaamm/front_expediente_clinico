import { TestBed, inject } from '@angular/core/testing';

import { CirugiasService } from './cirugias.service';

describe('CirugiasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CirugiasService]
    });
  });

  it('should ...', inject([CirugiasService], (service: CirugiasService) => {
    expect(service).toBeTruthy();
  }));
});
