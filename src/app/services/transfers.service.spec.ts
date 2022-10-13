import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TransfersService } from './transfers.service';

describe('TransfersService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: TransfersService = TestBed.inject(TransfersService);
    expect(service).toBeTruthy();
  });

});
