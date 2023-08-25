import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { onAuthGuard } from './on-auth.guard';

describe('onAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => onAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
