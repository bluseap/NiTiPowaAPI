import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TreeComponent } from 'angular-tree-component';

import { DataService } from '../../core/services/data.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../core/services/notification.service';
import { MessageContstants } from '../../core/common/message.constants';
import { AuthenService } from '../../core/services/authen.service';
import { UtilityService } from '../../core/services/utility.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})

export class RoleComponent implements OnInit {
  @ViewChild('modalAddEdit') public modalAddEdit: ModalDirective;
  @ViewChild('modalFunction') public modalFunction: ModalDirective;
  @ViewChild('grouppermissionModal') public grouppermissionModal: ModalDirective;
  @ViewChild(TreeComponent)  
  private treeFunction: TreeComponent;

  public _functionHierachy: any[];
  public _groupId: number = 0;  

  public pageIndex: number = 1;
  public pageSize: number = 30;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = '';
  public roles: any[];
  public entity: any;
  public _grouppermission: any[];
  public _permission: any;

  constructor(private _dataService: DataService, 
    private _notificationService: NotificationService,
    public _authenService: AuthenService,
    private _utilityService: UtilityService) { }

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
        //console.log(this.entity);        
      });
  }

  loadFunction(id: any) {
    this._dataService.get('/api/function/getlist')
      .subscribe((response: any[]) => {
        this._groupId = id;
        //this._functions = response.filter(x => x.ParentId == null);
        this._functionHierachy = this._utilityService.Unflatten3(response);
      }, error => this._dataService.handleError(error));
  }

  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadData();
  }

  public showGroupPermission(id: any) {
    this._dataService.get('/api/function/getgroupfunction?groupid=' + this._groupId + '&functionid=' + id).subscribe((response: any[]) => {
      //this.functionId = id; 

      var functionUrl : string;     
      for(let url of response["Table"]){
        functionUrl = url.FuctionUrl;
      }     
      
      if(functionUrl == "#"){
        return;
      }

      this._grouppermission = response["Table"];  

      this.grouppermissionModal.show();
    }, error => this._dataService.handleError(error));
  }
  
  showFunction(id: any) {
    this.loadFunction(id);
    this.modalFunction.show();
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

  public savePermission(valid: boolean,_permission: any) {
    if (valid) {
      _permission[0].UserNameLog = this._authenService.getLoggedInUser().username;
      
      this._dataService.put('/api/role/upgroupper', JSON.stringify(_permission[0])).subscribe((response: any) => {
        this._notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
        this.grouppermissionModal.hide();
      }, error => this._dataService.handleError(error));
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
