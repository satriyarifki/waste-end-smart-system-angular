import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScalesSalesViewComponent } from './scales-sales-view.component';

describe('ScalesSalesViewComponent', () => {
  let component: ScalesSalesViewComponent;
  let fixture: ComponentFixture<ScalesSalesViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScalesSalesViewComponent]
    });
    fixture = TestBed.createComponent(ScalesSalesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
