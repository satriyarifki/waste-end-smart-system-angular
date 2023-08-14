import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScalesSalesComponent } from './scales-sales.component';

describe('ScalesSalesComponent', () => {
  let component: ScalesSalesComponent;
  let fixture: ComponentFixture<ScalesSalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScalesSalesComponent]
    });
    fixture = TestBed.createComponent(ScalesSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
