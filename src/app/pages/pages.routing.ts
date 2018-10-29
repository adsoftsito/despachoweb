import { Routes, RouterModule } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule',
  },
  {
    path: 'login-admin',
    loadChildren: 'app/pages/login-admin/login-admin.module#LoginAdminModule',
  },
  {
      path: 'reports-only',
      loadChildren: './reports/reports.module#ReportsModule',
  },
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: 'usersControl', loadChildren: './usersControl/usersControl.module#UsersControlModule',data: {breadcrumb: 'Menu.usuarios'} },
      { path: 'travel_matrix', loadChildren: './travel_matrix/m_travel.module#MTravelModule', data: {breadcrumb: 'Menu.logistica'}  },
      { path: 'monitoring-and-reaction', loadChildren: './monitoringReaction/monitoringReaction.module#MonitoringReactionModule' },
      { path: 'reports', loadChildren: './reports/reports.module#ReportsModule',data: {breadcrumb: 'Menu.reportes'} },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', data: {breadcrumb: 'Menu.dashboard'} },
      //{ path: 'menuGrafiComponent', loadChildren: './menuGrafiComponent/menugrafic.module#MenuGraficModule',data: {breadcrumb: 'Menu.salud'} },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
