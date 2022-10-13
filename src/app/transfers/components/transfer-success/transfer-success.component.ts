import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TransferSuccess } from '@models';

@Component({
  selector: 'app-transfer-success',
  templateUrl: './transfer-success.component.html',
  styleUrls: ['./transfer-success.component.scss']
})
export class TransferSuccessComponent implements OnInit {

  @Input() transfer: TransferSuccess;
  @Output() another: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    this.transfer.id =  this.transfer.id.toString().padStart(10, "0")
  }

  anotherTransfer() {
    this.another.emit();
  }

}
