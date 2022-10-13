import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpErrorInterceptor } from './http-error.interceptor';

describe('Error interceptor', function () {
  let http: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    const testBed = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorInterceptor,
          multi: true
        }
      ],
    });

    http = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('Error 500 - abre modal', (done) => {
    // const spy = spyOn(TestBed.inject(ModalService), 'open');
    httpClient.get('/error').subscribe(() => { }, () => { done(); });
    http.expectOne('/error').error(new ErrorEvent('Server Error'), { status: 500 });
    http.verify();
    // expect(spy).toHaveBeenCalled();
  });

  it('Error 0 - abre modal', (done) => {
    // const spy = spyOn(TestBed.inject(ModalService), 'open');
    httpClient.get('/error').subscribe(() => { }, () => { done(); });
    http.expectOne('/error').error(new ErrorEvent('Server Error'), { status: 0 });
    http.verify();
    // expect(spy).toHaveBeenCalled();
  });

  it('Error 401 - no abre modal', (done) => {
    // const spy = spyOn(TestBed.inject(ModalService), 'open');
    httpClient.get('/error').subscribe(() => { }, () => { done(); });
    http.expectOne('/error').error(new ErrorEvent('Unauthorized error'), { status: 401 });
    http.verify();
    // expect(spy).toHaveBeenCalledTimes(0);
  });
});
