import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransfersListComponent } from './transfers-list.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [TransfersListComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [TransfersListComponent],
  providers: [],
})
export class TransfersListModule { }
