import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

import { LoginComponent } from './components/login/login';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout';
import { DashboardComponent } from './components/dashboard/dashboard';
import { CustomersComponent } from './components/customers/customers';
import { VehiclesComponent } from './components/vehicles/vehicles';
import { ServiceRequestsComponent } from './components/service-requests/service-requests';
import { loginGuard } from './guards/login.guard';


export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

 {
   path: 'login',
   component: LoginComponent,
   canActivate: [loginGuard]
 },

  {
    path: 'app',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'customers',
        component: CustomersComponent
      },
      {
        path: 'vehicles',
        component: VehiclesComponent
      },
      {
        path: 'service-requests',
        component: ServiceRequestsComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];
