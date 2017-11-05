import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BanhangComponent } from './banhang.component';
import { FormsModule } from '@angular/forms';

import { AuthenService } from '../core/services/authen.service';

import { DataService } from '../core/services/data.service';
import { UtilityService } from '../core/services/utility.service';
import { NotificationService } from '../core/services/notification.service';

export const routes: Routes = [
  //localhost:4200/banhang
  { path: '', component: BanhangComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],  
  providers: [ AuthenService,DataService, UtilityService,NotificationService],
  declarations: [BanhangComponent]
})
export class BanhangModule { }
