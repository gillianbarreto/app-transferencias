import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnDestroy {

  public showContactForm: boolean = false;
  public sub: any;

  constructor(
    private route: ActivatedRoute,
  ) {
    this.initView();
   }

   ngOnDestroy() {
    this.sub.unsubscribe();
  }

  initView() {
    this.sub = this.route.params.subscribe(params => {
      this.showContactForm = params['show'] == 'showForm';
    });
  }

  addNewContact() {
    this.showContactForm = true;
  }

  showList() {
    this.showContactForm = false;
  }

}
