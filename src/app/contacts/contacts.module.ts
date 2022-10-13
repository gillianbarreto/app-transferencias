import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContactsComponent } from './contacts.component';
import { SharedModule } from '@shared/shared.module';
import { ContactsRoutingModule } from './contacts.routing.module';
import { AlertModule } from '@shared/components';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';

@NgModule({
  declarations: [
    ContactsComponent,
    ContactFormComponent,
    ContactsListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ContactsRoutingModule,
    AlertModule
  ],
  exports: [],
  providers: [],
})
export class ContactsModule { }
