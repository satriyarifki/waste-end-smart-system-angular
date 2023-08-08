import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScalesPassboxOc1Component } from './scales-passbox-oc1.component';

describe('ScalesPassboxOc1Component', () => {
  let component: ScalesPassboxOc1Component;
  let fixture: ComponentFixture<ScalesPassboxOc1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScalesPassboxOc1Component]
    });
    fixture = TestBed.createComponent(ScalesPassboxOc1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
