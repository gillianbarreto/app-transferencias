import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferSuccessComponent } from './transfer-success.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [TransferSuccessComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [TransferSuccessComponent],
  providers: [],
})
export class TransferSuccessModule { }
