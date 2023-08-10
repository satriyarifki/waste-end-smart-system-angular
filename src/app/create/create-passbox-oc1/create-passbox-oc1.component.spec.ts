import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePassboxOc1Component } from './create-passbox-oc1.component';

describe('CreatePassboxOc1Component', () => {
  let component: CreatePassboxOc1Component;
  let fixture: ComponentFixture<CreatePassboxOc1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePassboxOc1Component]
    });
    fixture = TestBed.createComponent(CreatePassboxOc1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
