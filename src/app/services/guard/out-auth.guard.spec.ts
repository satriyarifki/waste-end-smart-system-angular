import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { outAuthGuard } from './out-auth.guard';

describe('outAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => outAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
