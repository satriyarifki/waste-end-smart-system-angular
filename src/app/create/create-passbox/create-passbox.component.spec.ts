import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePassboxComponent } from './create-passbox.component';

describe('CreatePassboxComponent', () => {
  let component: CreatePassboxComponent;
  let fixture: ComponentFixture<CreatePassboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePassboxComponent]
    });
    fixture = TestBed.createComponent(CreatePassboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
