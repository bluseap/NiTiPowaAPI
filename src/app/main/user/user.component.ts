import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { DataService } from '../../core/services/data.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../core/services/notification.service';
//import { UploadService } from '../../core/services/upload.service';
//import { AuthenService } from '../../core/services/authen.service';
import { UtilityService } from '../../core/services/utility.service';
import { MessageContstants } from '../../core/common/message.constants';
import { SystemConstants } from '../../core/common/system.constants';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  //@ViewChild('modalAddEdit') public modalAddEdit: ModalDirective;
  //@ViewChild('avatar') avatar;
  public myRoles: string[] = [];
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = '';
  public users: any[];
  public entity: any;
  public baseFolder: string = SystemConstants.BASE_API;
  public allRoles: IMultiSelectOption[] = [];
  public roles: any[];

  public dateOptions: any = {
    locale: { format: 'DD/MM/YYYY' },
    alwaysShowCalendars: false,
    singleDatePicker: true
  };

  constructor(private _dataService: DataService,
    private _notificationService: NotificationService,
    private _utilityService: UtilityService,
    //private _uploadService: UploadService,
  //  public _authenService: AuthenService
  ) {}

    /*if (_authenService.checkAccess('USER') == false) {
      _utilityService.navigateToLogin();
    }*/
 

  ngOnInit() {

    this.loadDataUser();
  }

  loadDataUser() {
    //this._dataService.get('/api/useradmin/getlist?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
    this._dataService.get('/api/useradmin/getlist?page=1&pageSize=2&filter=')
      .subscribe((response: any) => {
        this.users = response;
        this.pageIndex = response.PageIndex;
        this.pageSize = response.PageSize;
        this.totalRow = response.TotalRows;
      });
  }

}
