import { Component, OnInit } from '@angular/core';

import { DataService } from '../core/services/data.service';

import { NotificationService } from '../core/services/notification.service';
import { AuthenService } from '../core/services/authen.service';
import { MessageContstants } from '../core/common/message.constants';
import {UrlConstants} from '../core/common/url.constants';

import { Router } from '@angular/router';
import { LoggedInUser } from '../core/domain/loggedin.user';
import { SystemConstants } from '../core/common/system.constants';

import { UtilityService } from '../core/services/utility.service';

@Component({
  selector: 'app-banhang',
  templateUrl: './banhang.component.html',
  styleUrls: ['./banhang.component.css']
})
export class BanhangComponent implements OnInit {

  public pageIndex: number = 1;
  public pageSize: number = 30;
  public pageDisplay: number = 10;
  public totalRow: number;
  public mavach: string = '';  
  public soluong: number ;  

  constructor(private _dataService: DataService, 
    private _notificationService: NotificationService,
    public _authenService: AuthenService,
    private _utilityService: UtilityService) { }

  ngOnInit() {
    this.loadForm();
  }

  loadForm() {
    this.soluong = 1;
  }

  loadHangHoa() {
    /*this._dataService.get('/api/product/getlist?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)    
      .subscribe((response: any) => {
        this.products = response.Items;
        this.pageIndex = response.PageIndex;
        this.pageSize = response.PageSize;
        this.totalRow = response.TotalRows;       
      });*/
  }


}
