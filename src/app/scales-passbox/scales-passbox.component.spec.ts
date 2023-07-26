import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScalesPassboxComponent } from './scales-passbox.component';

describe('ScalesPassboxComponent', () => {
  let component: ScalesPassboxComponent;
  let fixture: ComponentFixture<ScalesPassboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScalesPassboxComponent]
    });
    fixture = TestBed.createComponent(ScalesPassboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
