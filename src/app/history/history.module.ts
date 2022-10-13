import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryComponent } from './history.component';
import { SharedModule } from '@shared/shared.module';
import { HistoryRoutingModule } from './history.routing.module';
import { TransfersListModule } from './components/transfers-list';

@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    HistoryRoutingModule,
    TransfersListModule
  ],
  exports: [],
  providers: [],
})
export class HistoryModule { }
