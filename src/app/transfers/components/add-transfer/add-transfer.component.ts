import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact, TransferSuccess } from '@models';
import { ContactsService, KEYS, SessionService, TransfersService } from '@services';
import { UnsubscribeOnDestroy, validFormat } from '@shared/utils';

@Component({
  selector: 'app-add-transfer',
  templateUrl: './add-transfer.component.html',
  styleUrls: [ './add-transfer.component.scss' ]
})
export class AddTransferComponent extends UnsubscribeOnDestroy implements OnInit {

  @Output() success: EventEmitter<any> = new EventEmitter<any>();

  public formTransfer: FormGroup;
  public disabledButton = false;
  public contactsList: Contact[] = [];
  public selectedContact: Contact = null;
  public alertMessage: string;
  public alertType: string;

  constructor(
    private formBuilder: FormBuilder,
    private contactsService: ContactsService,
    private transfersService: TransfersService,
    private sessionService: SessionService,
    private router: Router,
  ) {
    super();
    this.configForm();
  }

  ngOnInit(): void {
    this.setSelectData();
  }

  private configForm() {
    this.formTransfer = this.formBuilder.group({
      "contact_id": ['', [Validators.required]],
      "amount": ['', [Validators.required, Validators.min(1), Validators.pattern(validFormat.ONLY_NUMBERS)]],
      "message": ['', [Validators.minLength(3), Validators.maxLength(50), Validators.pattern(validFormat.ONLY_LETTERS)]],
    });
  }

  private setSelectData() {
    const user_id = this.sessionService.getData(KEYS.user);

    this.contactsService.getContacts(user_id).subscribe(response => {
      this.contactsList = response.getPayload();
    });
  }

  onSelectContact(i: number) {
    this.selectedContact = this.contactsList[i];
  }

  addNewContact() {
    this.router.navigate(['/contacts', 'showForm']);
  }

  sendTransfer() {
    if (this.disabledButton || !this.formTransfer.valid) return;

    this.disabledButton = true;

    const body = {
      user_id: this.sessionService.getData(KEYS.user),
      contact_id: this.selectedContact.contact_id,
      contact_rut: this.selectedContact.rut,
      contact_name: this.selectedContact.fullname,
      bank_name: this.selectedContact.bank_name,
      account_type_name: this.selectedContact.accounts_type?.name,
      account_number: this.selectedContact.account_number,
      message: this.formTransfer.value.message,
      amount: this.formTransfer.value.amount
    }

    this.transfersService.addTransfer(body).subscribe(response => {
      if (response.getCode() == 200) {
        this.formTransfer.reset();
        this.success.emit({
          ...body,
          ...response.getPayload(),
          email: this.selectedContact.email
        });
        this.selectedContact = null;
      } else {
        this.showMessageError();
      }
    }, (error) => {
      this.showMessageError();
    });
  }

  showMessageError() {
    this.showMessage('danger', 'Error al realizar la transferencia');
  }

  showMessage(type: string, message: string) {
    this.disabledButton = false;
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => { this.alertMessage = ''; }, 5000);
  }

}
