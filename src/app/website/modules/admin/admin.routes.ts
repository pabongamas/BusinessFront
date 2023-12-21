import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
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
        loadChildren: () =>
          import('./../users/users.routes').then((m) => m.routes),
        title: 'Administracion de Usuarios',
      },
      {
        path: 'rols',
        loadChildren: () =>
          import('./../rols/rols.routes').then((m) => m.routes),
        title: 'Administracion de Roles',
      },
      {
        path: 'business',
        loadChildren: () =>
          import('./../business/business.routes').then((m) => m.routes),
        title: 'Administracion de Negocios',
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./../categories/categories.routes').then((m) => m.routes),
        title: 'Administracion de Categorias',
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./../products/products.routes').then((m) => m.routes),
        title: 'Administracion de Productos',
      },
    ],
  },
];
