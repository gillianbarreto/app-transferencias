import { Component, OnInit } from '@angular/core';
import { Contact } from '@models';
import { ContactsService, KEYS, SessionService, TransfersService } from '@services';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit {

  public contactsList: Contact[] = null;

  constructor(
    private contactsService: ContactsService,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.getcontactsList();
  }

  getcontactsList() {
    this.contactsList = [];
    const user_id = this.sessionService.getData(KEYS.user);
    this.contactsService.getContacts(user_id).subscribe(response => {
      this.contactsList = response.getPayload();
    });
  }

}
