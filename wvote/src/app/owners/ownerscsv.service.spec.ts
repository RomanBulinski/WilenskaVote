import { TestBed } from '@angular/core/testing';

import { OwnerscsvService } from './ownerscsv.service';

describe('OwnerscsvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OwnerscsvService = TestBed.get(OwnerscsvService);
    expect(service).toBeTruthy();
  });
});
