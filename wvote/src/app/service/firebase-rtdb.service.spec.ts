import { TestBed } from '@angular/core/testing';

import { FirebaseRTDBService } from './firebase-rtdb.service';

describe('FirebaseRTDBService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseRTDBService = TestBed.get(FirebaseRTDBService);
    expect(service).toBeTruthy();
  });
});
