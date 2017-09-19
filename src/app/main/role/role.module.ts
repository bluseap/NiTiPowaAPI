import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';

import { Routes, RouterModule } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { PaginationModule  } from 'ngx-bootstrap/pagination';
import {FormsModule} from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { TreeModule } from 'angular-tree-component';

const roleRoutes: Routes = [
  //localhost:4200/main/role
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  //localhost:4200/main/home/index
  { path: 'index', component: RoleComponent }
]

@NgModule({
  imports: [
    CommonModule,
    PaginationModule,
    TreeModule,
    FormsModule,
    ModalModule.forRoot(),
    RouterModule.forChild(roleRoutes)
  ],
  declarations: [RoleComponent],
  providers:[DataService,NotificationService]
})
export class RoleModule { }
