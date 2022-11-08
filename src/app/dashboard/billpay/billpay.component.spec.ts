import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillpayComponent } from './billpay.component';

describe('BillpayComponent', () => {
  let component: BillpayComponent;
  let fixture: ComponentFixture<BillpayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillpayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
