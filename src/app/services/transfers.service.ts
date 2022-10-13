import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiClientService, DataResponse } from './shared';
import { TransferRequest } from '@models';
import { SessionService } from './utils/session/session.service';
import { environment } from '@environment';
import { EncryptService } from './utils/encrypt/encrypt.service';

@Injectable({
  providedIn: 'root'
})
export class TransfersService extends ApiClientService {

  constructor(
    protected http: HttpClient,
    protected sessionService: SessionService,
    private encryptService: EncryptService
  ) {
    super(http, sessionService);
  }

  public getTransfers(userId: number): Observable<DataResponse> {
    const url = `${this.urlBase}/transfers/${userId}`;
    return this.http.get(url, { headers: this.getHeaders(), observe: 'response' })
      .map(this.okData)
      .catch(this.errorData)
      .finally(() => { });
  }

  public addTransfer(body: TransferRequest): Observable<DataResponse> {
    const url = `${this.urlBase}/transfer`;
    const data = { data: this.encryptService.encrypt(body, environment.SECRET_KEY_REQUEST) };
    return this.http.post(url, data, { headers: this.getHeaders(), observe: 'response' })
      .map(this.okData)
      .catch(this.errorData)
      .finally(() => { });
  }

}
