import { Component, OnInit } from '@angular/core';

import { DataService } from '../../core/services/data.service';

import { UtilityService } from '../../core/services/utility.service';
import { NotificationService } from '../../core/services/notification.service';


@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css'],

  
  providers: [ DataService, UtilityService, NotificationService ]
})


export class SidebarMenuComponent implements OnInit {
 public functions: any[];
  constructor(private _dataService: DataService) { }  

  ngOnInit() {
    let body="/api/function/get?userid=3";

    this._dataService.get("/api/function/get?userid=3").subscribe((response: any[]) => {
      this.functions = response["Table"];
     /* this.functions = response["Table"].sort((n1, n2) => {
        if (n1.Order > n2.Order)
          return 1;
        else if (n1.Order < n2.Order)
          return -1;
        return 0;
      });*/
    }, error => this._dataService.handleError(error));
    
  }

}
