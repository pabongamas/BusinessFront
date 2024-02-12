import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/token/token.service';
import { inject } from '@angular/core';

export const roleGuardGuardSuperUser: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const isSuperUser = inject(TokenService).hasRole(1);
    if (!isSuperUser) {
      inject(Router).navigate(['/admin/dashboard']);
      return false;
    }
    return true;
};

export const roleGuardGuardAdmin: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const isAdmin = inject(TokenService).hasRole(2);
    if (!isAdmin) {
      inject(Router).navigate(['/admin/dashboard']);
      return false;
    }
    return true;
};
