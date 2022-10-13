import { Component } from '@angular/core';
import { Transfer } from '@models';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html'
})
export class TransfersComponent {

  public showTransferForm: boolean = true;
  public transferSuccess: Transfer;

  constructor() { }

  showTransferSuccess(transfer: Transfer) {
    this.transferSuccess = transfer;
    this.showTransferForm = false;
  }

  anotherTransfer() {
    this.showTransferForm = true;
  }

}
