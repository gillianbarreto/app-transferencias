import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiClientService, DataResponse } from './shared';
import { SessionService } from './utils/session/session.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralService extends ApiClientService {

  constructor(
    protected http: HttpClient,
    protected sessionService: SessionService
  ) {
    super(http, sessionService);
  }

  public getBanks(): Observable<DataResponse> {
    const url = `${this.urlBase}/banks`;
    return this.http.get(url, { headers: this.getHeaders(), observe: 'response' })
      .map(this.okData)
      .catch(this.errorData)
      .finally(() => { });
  }

  public getAccountsType(): Observable<DataResponse> {
    const url = `${this.urlBase}/accounts-type`;
    return this.http.get(url, { headers: this.getHeaders(), observe: 'response' })
      .map(this.okData)
      .catch(this.errorData)
      .finally(() => { });
  }

}
