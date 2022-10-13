import { TestBed } from '@angular/core/testing';

import { EncryptService } from './encrypt.service';

describe('EncryptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EncryptService = TestBed.inject(EncryptService);
    expect(service).toBeTruthy();
  });
});
