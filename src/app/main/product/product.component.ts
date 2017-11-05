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
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  @ViewChild('modalAddEditProduct') public modalAddEditProduct: ModalDirective;

  public pageIndex: number = 1;
  public pageSize: number = 30;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = '';

  public sumproduct: any[];
  public products: any[];
  public entity: any;
  public productCategories: any = [];

  constructor(private _dataService: DataService, 
    private _notificationService: NotificationService,
    public _authenService: AuthenService,
    private _utilityService: UtilityService) { }

  ngOnInit() {
    this.loadHangHoa();
    this.loadProductCategories();
    this.loadsumProduct();
  }

  public loadsumProduct()
  {
    this._dataService.get('/api/product/sumproduct').subscribe((response: any[]) => {
      this.sumproduct = response["Table"];  
    }, error => this._dataService.handleError(error));
  }

  public loadProductCategories() {
    this._dataService.get('/api/product/getallprocate').subscribe((response: any[]) => {
      this.productCategories = response;
    }, error => this._dataService.handleError(error));
  }

  loadHangHoa() {
    this._dataService.get('/api/product/getlist?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)    
      .subscribe((response: any) => {
        this.products = response.Items;
        this.pageIndex = response.PageIndex;
        this.pageSize = response.PageSize;
        this.totalRow = response.TotalRows;       
      });
  }

  showAddProduct(){
    this.entity = {};
    this.modalAddEditProduct.show();
  }

  showEditProduct(id: any){
    this._dataService.get('/api/product/get?id=' + id).subscribe((response: any) => {
      this.entity = response;
      this.modalAddEditProduct.show();   
    });    
  }

  deleteProduct(id: any) {
    this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG, () => this.deleteProductConfirm(id));
  }

  deleteProductConfirm(id: any) {
    this._dataService.delete('/api/product/delete', 'id', id).subscribe((response: Response) => {
      this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      this.loadHangHoa();
    });
  }

  saveProductChange(form: NgForm) {
    if (form.valid) {
      this.entity.UserNameLog = this._authenService.getLoggedInUser().username;      
      if (this.entity.ID == undefined) {
        this._dataService.post('/api/product/add', JSON.stringify(this.entity))
          .subscribe((response: any) => {
            this.loadHangHoa();
            this.modalAddEditProduct.hide();
            this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
          }, error => this._dataService.handleError(error));
      }
      else {
        this._dataService.put('/api/product/update', JSON.stringify(this.entity))
          .subscribe((response: any) => {
            this.loadHangHoa();
            this.modalAddEditProduct.hide();
            this._notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
          }, error => this._dataService.handleError(error));        
      }
    }
  }

  


}
