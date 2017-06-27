import { Component, OnInit } from '@angular/core';

import { DataService } from '../core/services/data.service';

import { NotificationService } from '../core/services/notification.service';
import { AuthenService } from '../core/services/authen.service';
import { MessageContstants } from '../core/common/message.constants';
import {UrlConstants} from '../core/common/url.constants';

import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  
})
export class LoginComponent implements OnInit { 

  loading = false;
  model: any = {};
  useradmin: any = {};

  returnUrl: string;
  constructor(
    private authenService: AuthenService,
   private _dataServiceMoi: DataService,
   
    private notificationService: NotificationService,

    private router: Router) { }

  ngOnInit() {
  }

  login() {
    //this.router.navigate([UrlConstants.HOME]);

    let id = 1;
//http://5951cd95138d63001132bc0e.mockapi.io/UserName
//api/useradmin/get?id=1

    this._dataServiceMoi.get('/api/useradmin/get?id=1').subscribe((response: any[]) => {
     // this._dataServiceMoi.get('/UserName').subscribe((response: any[]) => {
      this.useradmin = response;

      let username = this.useradmin.Username;
      let pass = this.useradmin.Password

      if (this.model.username == username && this.model.password == pass) {
        this.router.navigate([UrlConstants.HOME]);
        //this.notificationService.printErrorMessage(MessageContstants.SYSTEM_ERROR_MSG);
      }

    }, error => this._dataServiceMoi.handleError(error));


    /*this.loading = true;
    this.authenService.login(this.model.username, this.model.password).subscribe(data => {
      //this.router.navigate([UrlConstants.HOME]);
      this.notificationService.printErrorMessage(MessageContstants.SYSTEM_ERROR_MSG);
    }, error => {
      this.notificationService.printErrorMessage(MessageContstants.SYSTEM_ERROR_MSG);
      this.loading = false;
    });*/
  }

}
