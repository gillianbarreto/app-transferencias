import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { TransfersComponent } from './transfers.component';
import { TransfersRoutingModule } from './transfers.routing.module';
import { AddTransferModule } from './components/add-transfer';
import { TransferSuccessModule } from './components/transfer-success';

@NgModule({
  declarations: [
    TransfersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TransfersRoutingModule,
    AddTransferModule,
    TransferSuccessModule
  ],
  exports: [],
  providers: [],
})
export class TransfersModule { }
