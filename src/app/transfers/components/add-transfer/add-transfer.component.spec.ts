import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AddTransferComponent } from './add-transfer.component';

describe('AddTransferComponent', () => {
  let component: AddTransferComponent;
  let fixture: ComponentFixture<AddTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddTransferComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
