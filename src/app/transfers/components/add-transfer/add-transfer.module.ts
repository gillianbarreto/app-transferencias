import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddTransferComponent } from './add-transfer.component';
import { SharedModule } from '@shared/shared.module';
import { AlertModule } from '@shared/components';

@NgModule({
  declarations: [AddTransferComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AlertModule
  ],
  exports: [AddTransferComponent],
  providers: [],
})
export class AddTransferModule { }
