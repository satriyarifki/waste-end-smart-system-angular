import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScalesTpsComponent } from './scales-tps.component';

describe('ScalesTpsComponent', () => {
  let component: ScalesTpsComponent;
  let fixture: ComponentFixture<ScalesTpsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScalesTpsComponent]
    });
    fixture = TestBed.createComponent(ScalesTpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
