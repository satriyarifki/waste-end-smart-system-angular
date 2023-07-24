import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTransactionInComponent } from './create-transaction-in.component';

describe('CreateTransactionInComponent', () => {
  let component: CreateTransactionInComponent;
  let fixture: ComponentFixture<CreateTransactionInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTransactionInComponent]
    });
    fixture = TestBed.createComponent(CreateTransactionInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
