import { TestBed } from '@angular/core/testing';

import { GogoanimeService } from './gogoanime.service';

describe('GogoanimeService', () => {
  let service: GogoanimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GogoanimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
