import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { gudGuard } from './gud.guard';

describe('gudGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => gudGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
