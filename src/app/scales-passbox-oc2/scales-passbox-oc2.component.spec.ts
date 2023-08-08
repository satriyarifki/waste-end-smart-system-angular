import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScalesPassboxOc2Component } from './scales-passbox-oc2.component';

describe('ScalesPassboxOc2Component', () => {
  let component: ScalesPassboxOc2Component;
  let fixture: ComponentFixture<ScalesPassboxOc2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScalesPassboxOc2Component]
    });
    fixture = TestBed.createComponent(ScalesPassboxOc2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
