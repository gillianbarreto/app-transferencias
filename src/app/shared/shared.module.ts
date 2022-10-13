import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent, FooterComponent, ShowErrorsComponent } from '@shared/components';

const components = [
  HeaderComponent,
  FooterComponent,
  ShowErrorsComponent
];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [...components],
  exports: [...components]
})
export class SharedModule { }