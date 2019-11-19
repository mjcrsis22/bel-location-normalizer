import { TestBed } from '@angular/core/testing';

import { NormalizerService } from './normalizer.service';

describe('NormalizerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NormalizerService = TestBed.get(NormalizerService);
    expect(service).toBeTruthy();
  });
});
