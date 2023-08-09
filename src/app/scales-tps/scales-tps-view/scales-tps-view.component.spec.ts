import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScalesTpsViewComponent } from './scales-tps-view.component';

describe('ScalesTpsViewComponent', () => {
  let component: ScalesTpsViewComponent;
  let fixture: ComponentFixture<ScalesTpsViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScalesTpsViewComponent]
    });
    fixture = TestBed.createComponent(ScalesTpsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
