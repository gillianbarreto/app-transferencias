import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiClientService, DataResponse } from './shared';
import { ContactRequest } from '@models';
import { SessionService } from './utils/session/session.service';
import { EncryptService } from './utils/encrypt/encrypt.service';
import { environment } from '@environment';

@Injectable({
  providedIn: 'root'
})
export class ContactsService extends ApiClientService {

  constructor(
    protected http: HttpClient,
    protected sessionService: SessionService,
    private encryptService: EncryptService
  ) {
    super(http, sessionService);
  }

  public getContacts(userId: number): Observable<DataResponse> {
    const url = `${this.urlBase}/contacts/${userId}`;
    return this.http.get(url, { headers: this.getHeaders(), observe: 'response' })
      .map(this.okData)
      .catch(this.errorData)
      .finally(() => { });
  }

  public addContact(body: ContactRequest): Observable<DataResponse> {
    const url = `${this.urlBase}/contact`;
    const data = { data: this.encryptService.encrypt(body, environment.SECRET_KEY_REQUEST) };
    return this.http.post(url, data, { headers: this.getHeaders(), observe: 'response' })
      .map(this.okData)
      .catch(this.errorData)
      .finally(() => { });
  }

}
