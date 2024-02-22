import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { roleGuardGuardSuperUser,roleGuardGuardAdmin } from '../../guards/role-guard.guard';
import { authGuard } from '../../guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./../dashboard/dashboard.routes').then((m) => m.routes),
        title: 'Dashboard',
      },
      {
        path: 'users',
        canActivate: [roleGuardGuardSuperUser],
        loadChildren: () =>
          import('./../users/users.routes').then((m) => m.routes),
        title: 'Administracion de Usuarios',
      },
      {
        path: 'rols',
        canActivate: [roleGuardGuardSuperUser],
        loadChildren: () =>
          import('./../rols/rols.routes').then((m) => m.routes),
        title: 'Administracion de Roles',
      },
      {
        path: 'business',
        canActivate: [roleGuardGuardSuperUser],
        loadChildren: () =>
          import('./../business/business.routes').then((m) => m.routes),
        title: 'Administracion de Negocios',
      },
      {
        path: 'categories',
        canActivate: [roleGuardGuardAdmin],
        loadChildren: () =>
          import('./../categories/categories.routes').then((m) => m.routes),
        title: 'Administracion de Categorias',
      },
      {
        path: 'products',
        canActivate: [roleGuardGuardAdmin],
        loadChildren: () =>
          import('./../products/products.routes').then((m) => m.routes),
        title: 'Administracion de Productos',
      },
      {
        path: 'clients',
        canActivate: [roleGuardGuardAdmin],
        loadChildren: () =>
          import('./../clients/clients.routes').then((m) => m.routes),
        title: 'Administracion de Clientes',
      },
      {
        path: 'sales',
        canActivate: [roleGuardGuardAdmin],
        loadChildren: () =>
          import('./../sales/sales.route').then((m) => m.routes),
        title: 'Generar Venta',
      },
    ],
  },
];
