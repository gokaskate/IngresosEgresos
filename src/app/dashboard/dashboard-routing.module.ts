import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';

import { dashboardRoutes } from './dashboard.routes';

//Guard
 // import { AuthGuardService } from './../auth/auth-guard.service';

const childRoutes: Routes  = [
  { 
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes,
    // canActivate: [AuthGuardService]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( childRoutes )
  ],
  exports: [
    RouterModule
  ]
  
})
export class DashboardRoutingModule { }
