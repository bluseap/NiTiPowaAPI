import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { DataService } from '../../core/services/data.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../core/services/notification.service';
import { MessageContstants } from '../../core/common/message.constants';
import { AuthenService } from '../../core/services/authen.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})

export class RoleComponent implements OnInit {
@ViewChild('modalAddEdit') public modalAddEdit: ModalDirective;
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = '';
  public roles: any[];
  public entity: any;
  constructor(private _dataService: DataService, 
    private _notificationService: NotificationService,
    public _authenService: AuthenService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._dataService.get('/api/role/getlist?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)    
      .subscribe((response: any) => {
        this.roles = response.Items;
        this.pageIndex = response.PageIndex;
        this.pageSize = response.PageSize;
        this.totalRow = response.TotalRows;
      });
  }

  loadRole(id: any) {
    this._dataService.get('/api/role/get?id=' + id)
      .subscribe((response: any) => {
        this.entity = response;
        console.log(this.entity);
      });
  }

  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadData();
  }

  showAddModal() {
    this.entity = {};
    this.modalAddEdit.show();
  }

  showEditModal(id: any) {
    this.loadRole(id);
    this.modalAddEdit.show();
  }

  //saveChange(valid: boolean) {
    saveChange(form: NgForm) {
    if (form.valid) {
      this.entity.UserNameLog = this._authenService.getLoggedInUser().username;
      
      if (this.entity.Id == undefined) {
        this._dataService.post('/api/role/add', JSON.stringify(this.entity))
          .subscribe((response: any) => {
            this.loadData();
            this.modalAddEdit.hide();
            this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
          }, error => this._dataService.handleError(error));
      }
      else {
        this._dataService.put('/api/role/update', JSON.stringify(this.entity))
          .subscribe((response: any) => {
            this.loadData();
            this.modalAddEdit.hide();
            this._notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
          }, error => this._dataService.handleError(error));
      }
    }
  }

  private saveData(form: NgForm) {
    if (this.entity.Id == undefined) {

    }
    else{

    }
  }

  deleteItem(id: any) {
    this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG, () => this.deleteItemConfirm(id));
  }

  deleteItemConfirm(id: any) {
    this._dataService.delete('/api/appRole/delete', 'id', id).subscribe((response: Response) => {
      this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      this.loadData();
    });
  }

}
