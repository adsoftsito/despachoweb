import { NgModule } from '@angular/core';
import { NgaModule } from '../../theme/nga.module';
import { routing } from './usersControl.routing';
import { UsersControlComponent } from './usersControl.component';
import { UsersComponent } from './components/users';
import { CreateUserComponent } from './components/users/createUser';
import { UserListComponent } from './components/users/userList';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

import { AgGridModule } from 'ag-grid-angular/main';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {UserService} from "./components/users/user.service";
import {CommonModule} from "@angular/common";

import { Select2Module } from 'ng2-select2';
import {ClientsProductsComponent} from "./components/clients/clients.component";
import {FormClientProductComponent} from "./components/clients/formClient/formClient.component";
import { ClientProductService } from './components/clients/clients.service';
import {FormOrderComponent} from "./components/clients/formOrder/formOrder.component";

import { AngularDualListBoxModule } from 'angular-dual-listbox';

@NgModule({
    declarations: [
      UsersControlComponent,
      UsersComponent,
      CreateUserComponent,
      UserListComponent,
      ClientsProductsComponent,
      FormClientProductComponent,
      FormOrderComponent,
    ],
    imports: [
      CommonModule,
      Select2Module,
      AngularFormsModule,
      NgaModule,
      routing,
      NgbModule,
      TranslateModule,
      AgGridModule.withComponents([]),
      AngularDualListBoxModule ,
    ],
    providers: [
      UserService,
      ClientProductService,
    ]
})

export class UsersControlModule {}
