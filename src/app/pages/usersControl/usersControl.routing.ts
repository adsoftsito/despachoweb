import { Routes, RouterModule } from '@angular/router';
import { UsersControlComponent } from './usersControl.component';
import { UsersComponent } from './components/users';
import { CreateUserComponent } from './components/users/createUser';
import { UserListComponent } from './components/users/userList';
import { ModuleWithProviders } from '@angular/core';
import {ClientsProductsComponent} from "./components/clients/clients.component";
import {FormClientProductComponent} from "./components/clients/formClient/formClient.component";
import {FormOrderComponent} from "./components/clients/formOrder/formOrder.component";


const routes: Routes = [
{
  path: '',
  component: UsersControlComponent,
  children: [{
    path: 'users',
    component: UsersComponent,
    children: [{
        path: 'create',
        component: CreateUserComponent,
        data: {breadcrumb: 'pages.userControl.client_user.createUsersSection'}
      },{
        path: 'edit',
        component: CreateUserComponent,
        data: {breadcrumb: 'pages.userControl.client_user.editUsersSection'}
      }],
    data: {breadcrumb: 'pages.userControl.client_user.usersSection'}
  }, {
    path: 'clients-products',
    component: ClientsProductsComponent,
    children: [{
      path: 'create',
      component: FormClientProductComponent,
      data: {breadcrumb: 'pages.userControl.client_product.create_section'}
    }, {
      path: 'edit',
      component: FormClientProductComponent,
      data: {breadcrumb: 'pages.userControl.client_product.edit_section'}
    }, {
      path: 'orders',
      component: FormOrderComponent,
      data: {breadcrumb: 'pages.userControl.client_product.edit_section'}
    }],
    data: {breadcrumb: 'pages.userControl.client_product.section'}
  }]
}

];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
