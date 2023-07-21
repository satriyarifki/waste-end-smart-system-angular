import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionOutComponent } from './transaction-out.component';

describe('TransactionOutComponent', () => {
  let component: TransactionOutComponent;
  let fixture: ComponentFixture<TransactionOutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionOutComponent]
    });
    fixture = TestBed.createComponent(TransactionOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
