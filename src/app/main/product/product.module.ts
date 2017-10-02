import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { Routes, RouterModule } from '@angular/router';

import { DataService } from '../../core/services/data.service';
import { UtilityService } from '../../core/services/utility.service';
import { NotificationService } from '../../core/services/notification.service';
import { UploadService } from '../../core/services/upload.service';
import { PaginationModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { Daterangepicker } from 'ng2-daterangepicker';
import { AuthenService } from '../../core/services/authen.service';

const ProductRoutes: Routes = [
   //localhost:4200/main/product
  { path: '', redirectTo: 'index', pathMatch: 'full' },
   //localhost:4200/main/product/index
  { path: 'index', component: ProductComponent }
]

@NgModule({
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    FormsModule,
    MultiselectDropdownModule,
    Daterangepicker,
    ModalModule.forRoot(),
    RouterModule.forChild(ProductRoutes)
  ],
  declarations: [ProductComponent],
  providers: [DataService, UtilityService, NotificationService, UploadService, AuthenService]
})

export class ProductModule { }
