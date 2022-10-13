import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiClientService, DataResponse } from './shared';
import { LoginRequest } from '@models';
import { SessionService } from './utils/session/session.service';
import { EncryptService } from './utils/encrypt/encrypt.service';
import { environment } from '@environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends ApiClientService {

  constructor(
    protected http: HttpClient,
    protected sessionService: SessionService,
    private encryptService: EncryptService
  ) {
    super(http, sessionService);
  }

  public login(body: LoginRequest): Observable<DataResponse> {
    const url = `${this.urlBase}/login`;
    const data = { data: this.encryptService.encrypt(body, environment.SECRET_KEY_REQUEST) };
    return this.http.post(url, data, { headers: this.getHeaders(), observe: 'response' })
      .map(this.okData)
      .catch(this.errorData)
      .finally(() => { });
  }

}
