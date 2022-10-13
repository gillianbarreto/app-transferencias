import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

import { SessionService, KEYS } from '@services';
import { AuthGuard } from './auth-guard';
import { SessionServiceMock } from '@mocks';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let sesionService: SessionService;

  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: SessionService, useClass: SessionServiceMock },
        { provide: Router, useValue: router }
      ]
    });
    sesionService = TestBed.inject(SessionService);
  });

  beforeEach(() => {
    guard = TestBed.inject(AuthGuard);
  });

  it('canActivate - isLogin', () => {
    sesionService.setData(KEYS.user, 'tokenMock');
    expect(guard.canActivate()).toBeTruthy();
  });

  it('canActivate - !isLogin', () => {
    sesionService.deleteItem(KEYS.user);
    expect(guard.canActivate()).toBeFalsy();
  });

});
