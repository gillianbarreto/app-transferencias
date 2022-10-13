import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TransferSuccessComponent } from './transfer-success.component';

describe('TransferSuccessComponent', () => {
  let component: TransferSuccessComponent;
  let fixture: ComponentFixture<TransferSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransferSuccessComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
