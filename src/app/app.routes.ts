import { Routes } from '@angular/router';
// import { authGuardFn } from '@guards/auth-fn.guard';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/auth/login',
  //   pathMatch: 'full',
  // },
  {
    path: 'admin',
    // canActivate: [authGuardFn],
    loadChildren: () =>
      import('./website/modules/admin/admin.routes').then((m) => m.routes),
  },
  {
    path: '',
    // canActivate: [ RedirectGuard ],
    loadChildren: () => import('./website/modules/auth/auth.routes').then((m) => m.routes),
  },
];
