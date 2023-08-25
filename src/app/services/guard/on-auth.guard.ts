import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AlertType } from '../alert/alert.model';
import { AlertService } from '../alert/alert.service';
import { AuthService } from '../auth.service';

export const onAuthGuard: CanActivateFn = (route, state) => {
  const authService : AuthService = inject(AuthService)
  const router : Router = inject(Router)
  const alertService : AlertService = inject(AlertService)

  if(authService.getToken() != null){
    return true
  } else {
    alertService.onCallAlert('You Need Login First !', AlertType.Info)
    router.navigate(['/login']);
    return false
  }
};
