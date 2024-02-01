import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { TokenService } from '../services/token/token.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const isValidToken = inject(TokenService).isValidToken();
    if (!isValidToken) {
      inject(Router).navigate(['/login']);
      return false;
    }
    return true;
};
