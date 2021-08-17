import { TestBed } from '@angular/core/testing';

import { NyaaService } from './nyaa.service';

describe('NyaaService', () => {
  let service: NyaaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NyaaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
