import { Component, OnInit } from '@angular/core';
import { TransfersList } from '@models';
import { KEYS, SessionService, TransfersService } from '@services';

@Component({
  selector: 'app-transfers-list',
  templateUrl: './transfers-list.component.html',
  styleUrls: ['./transfers-list.component.scss']
})
export class TransfersListComponent implements OnInit {

  public transfersList: TransfersList[] = null;

  constructor(
    private transfersService: TransfersService,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.getTransfersList();
  }

  getTransfersList() {
    this.transfersList = [];
    const user_id = this.sessionService.getData(KEYS.user);
    this.transfersService.getTransfers(user_id).subscribe(response => {
      this.transfersList = response.getPayload();
    });
  }

}
