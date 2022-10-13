import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { SpinnerInterceptor } from './spinner.interceptor';
import { SpinnerService } from './../components/spinner/spinner.service';
import { GeneralService, SessionService } from '@services';
import { environment } from '@environment';

describe('SpinnerInterceptor', () => {
  let generalService: GeneralService;
  let httpMock: HttpTestingController;
  let interceptor: SpinnerInterceptor;
  const spinnerServiceSpy = jasmine.createSpyObj('SpinnerService', ['openSpinner', 'closeSpinner']);
  const url = `${environment.API_URL}${environment.API_BASE}/accounts-type`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SessionService,
        GeneralService,
        SpinnerInterceptor,
        { provide: SpinnerService, useValue: spinnerServiceSpy },
        { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }
      ],
    });
    generalService = TestBed.inject(GeneralService);
    httpMock = TestBed.inject(HttpTestingController);
    interceptor = TestBed.inject(SpinnerInterceptor);
  });

  it('should hide spinner', () => {
    generalService.getAccountsType().pipe(
      take(1),
    ).toPromise()
     .then(res => {
        expect(spinnerServiceSpy.openSpinner).toHaveBeenCalledTimes(1);
        expect(spinnerServiceSpy.closeSpinner).toHaveBeenCalledTimes(1);
    });
    httpMock.expectOne(url).flush({});
  });

});

