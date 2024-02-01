import { Routes } from '@angular/router';
import { authGuard } from '../app/website/guards/auth.guard';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/auth/login',
  //   pathMatch: 'full',
  // },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./website/modules/admin/admin.routes').then((m) => m.routes),
  },
  {
    path: '',
    // canActivate: [ RedirectGuard ],
    loadChildren: () => import('./website/modules/auth/auth.routes').then((m) => m.routes),
  },
];
