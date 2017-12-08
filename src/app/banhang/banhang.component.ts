import { Component, OnInit } from '@angular/core';
import {FocusModule} from 'angular2-focus';

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
  public hangbanID: string = '';

  public isTaoDonHang: boolean;
  public isXoaDonHang: boolean;

  public event: any;
  public hangban: any;
  public maxid: any;
  public banhangchitiet: any;

  public hangbanct: any[];

  constructor(private _dataService: DataService, 
    private _notificationService: NotificationService,
    public _authenService: AuthenService,
    private _utilityService: UtilityService) { }

  ngOnInit() {    
    this.loadForm(); 
    this.GetMaxID();
    this.loadXoaDonHang();
    this.loadKeyCode(event);       
  }

  loadForm() {    
    this.soluong = 1;
    this.isTaoDonHang = false;  
    this.isXoaDonHang = false;  
  }

  loadHangHoa() {
    if (this.isTaoDonHang == true) {
      this._notificationService.printSuccessMessage(this.soluong.toString() + '- ' + this.hangbanID + ' -' + this.mavach);

      this.ThemHangBanChiTiet(this.hangbanID, this.mavach, this.soluong);

      this.mavach = '';
      this.soluong = 1;      
    }
    else {
      this._notificationService.printSuccessMessage("Tạo đơn hàng trước..");
    }
  }

  loadTaoDonHang()  {
    this.isTaoDonHang = true;  
    this.isXoaDonHang = false;  
    this.ThemHangBan();
  }
  loadXoaDonHang()  {
    this.isTaoDonHang = false;
    this.isXoaDonHang = true;
    this.XoaHangBan(this.hangbanID);
  }

  loadKeyCode(e: any) {   
    e = e || window.event;

    if (e.keyCode == '120 ') {          // f9
      this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);      
      this.loadTaoDonHang();
    }
    else if (e.keyCode == '115') {      // f4
      this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
      this.loadXoaDonHang();
    }
    else if (e.keyCode == '119') {      // f8 
      this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
    }
    else if (e.keyCode == '117') {      // f6
      this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
    }    
  }

  public ThemHangBanChiTiet(hangbanid: string, mavachid: string, soluong: number) {    
    if (this.isTaoDonHang == true) {
      this.banhangchitiet = {};
      this.banhangchitiet.BanHangID = hangbanid;
      this.banhangchitiet.MaVach = mavachid;
      this.banhangchitiet.SoLuongBan = soluong;
      this.banhangchitiet.UserNameLog = 'guest';

      this._dataService.post('/api/hangban/addct', JSON.stringify(this.banhangchitiet)).subscribe((response: any) => {
        this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);    
        this.GetListBanHangChiTiet(hangbanid);   
      }, error => this._dataService.handleError(error));
    }        
  }

  ThemHangBan() {    
    if (this.isTaoDonHang == true) {  
      this.hangban = {};
      this.hangban.ID = this.maxid;
      this.hangbanID = this.maxid;

      this._dataService.post('/api/hangban/add', JSON.stringify(this.hangban)).subscribe((response: any) => {
        this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
        this.GetMaxID();
      }, error => this._dataService.handleError(error));
    } 
  }

  GetListBanHangChiTiet(hangbanid: string)
  {
    //this._dataService.get('/api/hangban/getlistct?page=' + this.pageIndex + '&pageSize=' + this.pageSize +  '&filter=' + banhangid)    
    this._dataService.get('/api/hangban/getlistct?hangbanid=' + hangbanid)    
    .subscribe((response: any) => {
      this.hangbanct = response;
      this.pageIndex = response.PageIndex;
      this.pageSize = response.PageSize;
      this.totalRow = response.TotalRows;       
    });
  }

  GetMaxID(){
    this._dataService.get('/api/hangban/getmaxid').subscribe((response: any) => {
      this.maxid = response;
    });
  }

  XoaHangBan(id: any) {
    if (this.isXoaDonHang == true) {
      this.deleteHangHoaConfirm(id);
      //this._notificationService.printConfirmationDialog(
      //  MessageContstants.CONFIRM_DELETE_MSG, () => this.deleteHangHoaConfirm(id)); 
    }       
  }
  deleteHangHoaConfirm(id: any) {
    this._dataService.delete('/api/hangban/delete', 'id', id).subscribe((response: Response) => {
      this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);      
    });
  }


}
