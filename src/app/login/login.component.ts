import { Component, OnInit } from '@angular/core';

import { DataService } from '../core/services/data.service';

import { NotificationService } from '../core/services/notification.service';
import { AuthenService } from '../core/services/authen.service';
import { MessageContstants } from '../core/common/message.constants';
import {UrlConstants} from '../core/common/url.constants';

import { Router } from '@angular/router';
import { LoggedInUser } from '../core/domain/loggedin.user';
import { SystemConstants } from '../core/common/system.constants';

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
    let body="/api/useradmin/getuserpass?username=admin&pass=1";
    //let body2="/api/function/get?userid=3";

    this._dataServiceMoi.get(body).subscribe((response: any[]) => {     
      this.useradmin = response;
      let id = this.useradmin.Id;
      let username = this.useradmin.Username;
      let active = this.useradmin.Active;
      let hoten = this.useradmin.HoTen;
      let manv = this.useradmin.MaNV;
      let avartar = this.useradmin.Avatar;

      //console.log(this.useradmin);

      if (this.model.username == username && this.model.password == this.useradmin.Password) {
        let user: LoggedInUser = this.useradmin;

        this.router.navigate([UrlConstants.HOME]);

        localStorage.removeItem(SystemConstants.CURRENT_USER);
        localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(user));        
      }
    }, error => this._dataServiceMoi.handleError(error));

    /*this._dataServiceMoi.get(body2).subscribe((response: any[]) => {     


      this.useradmin = response["Table"];

      let id = this.useradmin.Id;
      let username = this.useradmin.FunctionId;
      let active = this.useradmin.Active;
      let hoten = this.useradmin.HoTen;
      let manv = this.useradmin.MaNV;
      let avartar = this.useradmin.Avatar;

      console.log(this.useradmin);

      if (this.model.username == username && this.model.password == this.useradmin.Password) {
        let user: LoggedInUser = this.useradmin;

        this.router.navigate([UrlConstants.HOME]);

        localStorage.removeItem(SystemConstants.CURRENT_USER);
        localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(user));        
      }
    }, error => this._dataServiceMoi.handleError(error));*/


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
