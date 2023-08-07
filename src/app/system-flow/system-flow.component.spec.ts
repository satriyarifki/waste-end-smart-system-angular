import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemFlowComponent } from './system-flow.component';

describe('SystemFlowComponent', () => {
  let component: SystemFlowComponent;
  let fixture: ComponentFixture<SystemFlowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SystemFlowComponent]
    });
    fixture = TestBed.createComponent(SystemFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
