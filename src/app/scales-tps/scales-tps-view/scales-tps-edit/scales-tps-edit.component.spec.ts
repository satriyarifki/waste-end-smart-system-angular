import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScalesTpsEditComponent } from './scales-tps-edit.component';

describe('ScalesTpsEditComponent', () => {
  let component: ScalesTpsEditComponent;
  let fixture: ComponentFixture<ScalesTpsEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScalesTpsEditComponent]
    });
    fixture = TestBed.createComponent(ScalesTpsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
