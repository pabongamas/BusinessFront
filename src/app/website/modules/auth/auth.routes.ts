import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';

import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadChildren: () =>
          import('../auth/components/login/login.routes').then((m) => m.routes),
        title: 'Auth',
      },
    ],
  },
];
