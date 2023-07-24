import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTransactionOutComponent } from './create-transaction-out.component';

describe('CreateTransactionOutComponent', () => {
  let component: CreateTransactionOutComponent;
  let fixture: ComponentFixture<CreateTransactionOutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTransactionOutComponent]
    });
    fixture = TestBed.createComponent(CreateTransactionOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
