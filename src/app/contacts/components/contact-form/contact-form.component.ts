import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AccountType, Banks } from '@models';
import { ContactsService, GeneralService, KEYS, SessionService } from '@services';
import { UnsubscribeOnDestroy, validFormat } from '@shared/utils';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent extends UnsubscribeOnDestroy implements OnInit {

  @Output() success: EventEmitter<any> = new EventEmitter<any>();

  public formContact: FormGroup;
  public disabledButton = false;
  public banksList: Banks[] = [];
  public accountsTypeList: AccountType[] = [];
  public alertMessage: string;
  public alertType: string;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactsService,
    private generalService: GeneralService,
    private sessionService: SessionService
  ) {
    super();
    this.configForm();
  }

  ngOnInit(): void {
    this.setSelectData();
  }

  private configForm() {
    this.formContact = this.formBuilder.group({
      "rut": ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern(validFormat.RUT)]],
      "fullname": ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(validFormat.ONLY_LETTERS)]],
      "email": ['', [Validators.required, Validators.pattern(validFormat.EMAIL)]],
      "phone": ['', [Validators.required, Validators.minLength(9), Validators.maxLength(12), Validators.pattern(validFormat.ONLY_NUMBERS)]],
      "bank_id": ['', [Validators.required]],
      "account_type_id": ['', [Validators.required]],
      "account_number": ['', [Validators.required, Validators.minLength(9), Validators.maxLength(15), Validators.pattern(validFormat.ONLY_NUMBERS)]],
      "alias": ['', [Validators.minLength(3), Validators.maxLength(50), Validators.pattern(validFormat.ONLY_LETTERS)]],
    });
  }

  private setSelectData() {
    this.generalService.getBanks().subscribe(response => {
      this.banksList = response.getPayload()?.banks;
    });

    this.generalService.getAccountsType().subscribe(response => {
      this.accountsTypeList = response.getPayload();
    });
  }

  public addContact() {
    if (this.disabledButton || !this.formContact.valid) return;

    this.disabledButton = true;

    const body = {
      user_id: this.sessionService.getData(KEYS.user),
      bank_name: this.getBankName(this.formContact.value.bank_id),
      ...this.formContact.value
    }

    this.contactService.addContact(body).subscribe(response => {
      if (response.getCode() == 200) {
        this.formContact.reset();
        this.showMessage('success', 'Datos actualizados correctamente');
        this.showList();
      } else {
        this.showMessageError();
      }
    }, (error) => {
      this.showMessageError();
    });

  }

  getBankName(bank_id: string) {
    const index = this.banksList.findIndex(item => item.id === bank_id);
    return index < 0 ? '' : this.banksList[index].name;
  }

  showMessageError() {
    this.showMessage('danger', 'Error al actualizar el destinatario');
  }

  showMessage(type: string, message: string) {
    this.disabledButton = false;
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => { this.alertMessage = ''; }, 5000);
  }

  showList() {
    this.success.emit();
  }

}
