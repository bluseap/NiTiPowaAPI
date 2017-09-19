import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { UploadService } from '../../core/services/upload.service';
import { AuthenService } from '../../core/services/authen.service';
import { UtilityService } from '../../core/services/utility.service';
import { MessageContstants } from '../../core/common/message.constants';
import { SystemConstants } from '../../core/common/system.constants';

import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { ModalDirective } from 'ngx-bootstrap/modal';

import * as moment from 'moment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @ViewChild('modalAddEdit') public modalAddEdit: ModalDirective;
  @ViewChild('avatar') avatar;
  public myRoles: string[] = [];
  public pageIndex: number = 1;
  public pageSize: number = 5;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = '';
  public users: any[];
  public entity: any;
  public baseFolder: string = SystemConstants.BASE_API;
  public allRoles: IMultiSelectOption[] = [];
  public roles: any[];

  public genderss : string = "" ;

  public usernamelog: any[];

  public rolenumber: number[] = [];

  public dateOptions: any = {
    locale: { format: 'DD/MM/YYYY' },
    alwaysShowCalendars: false,
    singleDatePicker: true
  };

  constructor(private _dataService: DataService,
    private _notificationService: NotificationService,
    private _utilityService: UtilityService,
    private _uploadService: UploadService,
    public _authenService: AuthenService
  ) { }

  /*if (_authenService.checkAccess('USER') == false) {
    _utilityService.navigateToLogin();
  }*/


  ngOnInit() {
    this.loadRoles();
    this.loadDataUser();
  }

  loadDataUser() {
    this._dataService.get('/api/useradmin/getlist?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
      //this._dataService.get('/api/useradmin/getlist?page=1&pageSize=1&filter=')
      .subscribe((response: any) => {
        this.users = response.Items;

        this.pageIndex = response.PageIndex;
        this.pageSize = response.PageSize;
        this.totalRow = response.TotalRows;
      });
  }

  loadRoles() {
    //this._dataService.get('/api/appRole/getlistall').subscribe((response: any[]) => {
    this._dataService.get('/api/useradmin/getlistgroup').subscribe((response: any[]) => {
      this.allRoles = [];
      for (let role of response) {
        this.allRoles.push({ id: role.Id, name: role.Name });
        //this.allRoles.push({ id: role.Name, name: role.Description });
      }
    }, error => this._dataService.handleError(error));
  }

  loadUserDetail(id: any) {
    this._dataService.get('/api/useradmin/get?id=' + id)
      .subscribe((response: any) => {
        this.entity = response;
        //this.myRoles = [];        

        this.rolenumber = [];
        for (let role of this.entity.Roles) {
          var roleint = Number(role);
          this.rolenumber.push(roleint);
        }

        //this.entity.BirthDay = moment(new Date(this.entity.BirthDay)).format('DD/MM/YYYY');
        this.genderss = String(this.entity.Gender);

        //this.genderss = "false";
        //console.log(this.rolenumber);
        //console.log(this.entity.BirthDay);
        //console.log(this.entity.Gender);
      });
  }

  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadDataUser();
  }

  saveChange(form: NgForm) {
    if (form.valid) {

      this.entity.UserNameLog = this._authenService.getLoggedInUser().username;

      this.entity.Roles = this.rolenumber;
      let fi = this.avatar.nativeElement;

      if (fi.files.length > 0) {
        this._uploadService.postWithFile('/api/upload/saveImage?type=avatar', null, fi.files)
          .then((imageUrl: string) => {
            this.entity.Avatar = imageUrl;
          }).then(() => {
            this.saveData(form);
          });
      }
      else {
        this.saveData(form);
      }
    }
  }

  private saveData(form: NgForm) {
    if (this.entity.Id == undefined) {
      this._dataService.post('/api/useradmin/add', JSON.stringify(this.entity))
        .subscribe((response: any) => {
          this.loadDataUser();
          this.modalAddEdit.hide();
          form.resetForm();
          this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
        }, error => this._dataService.handleError(error));
    }
    else {
      this._dataService.put('/api/useradmin/update', JSON.stringify(this.entity))
        .subscribe((response: any) => {
          this.loadDataUser();
          this.modalAddEdit.hide();
          form.resetForm();
          this._notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
        }, error => this._dataService.handleError(error));
    }
  }

  deleteItem(id: any) {
    this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG, () => this.deleteItemConfirm(id));
  }

  deleteItemConfirm(id: any) {
    this._dataService.delete('/api/useradmin/delete', 'id', id).subscribe((response: Response) => {
      this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      this.loadDataUser();
    });
  }

  showAddModal() {
    this.entity = {};
    this.modalAddEdit.show();
  }

  showEditModal(id: any) {
    this.loadUserDetail(id);
    this.modalAddEdit.show();
  }

  public selectGender(event) {
    this.entity.Gender = event.target.value;
  }

  public selectedDate(value: any) {
    this.entity.BirthDay = moment(value.end._d).format('DD/MM/YYYY');
  }

}
