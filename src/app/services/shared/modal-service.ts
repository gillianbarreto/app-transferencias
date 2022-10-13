import { Injectable } from '@angular/core';

declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private myModal;

  initModal(modal) {
    this.myModal = new window.bootstrap.Modal(
      document.getElementById(modal)
    );
  }

  showModal() {
    // TODO: varios modales al mismo tiempo
    // if (!this.myModal._isShown)
    this.myModal.show();
  }

  closeModal() {
    this.myModal.hide();
  }

}
