import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: LoginService = TestBed.inject(LoginService);
    expect(service).toBeTruthy();
  });

});
