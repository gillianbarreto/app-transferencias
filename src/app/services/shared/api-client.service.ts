import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';

import { environment } from '@environment';
import { DataResponse } from './data-response';
import { SessionService } from '../utils/session/session.service';

@Injectable()
export abstract class ApiClientService {

  protected urlBase = `${environment.API_URL}${environment.API_BASE}`;

  constructor(
    protected http: HttpClient,
    protected sessionService: SessionService
  ) { }

  protected getHeaders(): any {
    return {
      'Content-Type': 'application/json',
      'nombre-aplicacion': environment.APP_NAME,
      'Authorization': this.sessionService.getToken() || 'test'
    }
  }

  protected okData<T>(response: HttpResponse<any>): DataResponse {
    if (response === null || response.status !== 200) throw response;

    return new DataResponse(
      response.body['code'],
      response.body['message'],
      response.body['payload']
    );
  }

  protected errorData(body: any): Observable<DataResponse> {
    const response: DataResponse = new DataResponse(
      null,
      body.error && body.error.mensaje || 'En estos momentos no te podemos atender, favor intenta más tarde',
      body
    );
    return throwError(response);
  }

}
