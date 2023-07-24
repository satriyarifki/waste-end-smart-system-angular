import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintTransactionInComponent } from './print-transaction-in.component';

describe('PrintTransactionInComponent', () => {
  let component: PrintTransactionInComponent;
  let fixture: ComponentFixture<PrintTransactionInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrintTransactionInComponent]
    });
    fixture = TestBed.createComponent(PrintTransactionInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
