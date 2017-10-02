import { Component, OnInit, ElementRef } from '@angular/core';
import { SystemConstants } from '../core/common/system.constants';
import { UrlConstants } from '../core/common/url.constants';
import { UtilityService } from '../core/services/utility.service';
import {LoggedInUser} from '../core/domain/loggedin.user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  public user: LoggedInUser;
  constructor(private utilityService: UtilityService,
              private elementRef: ElementRef
            ) { }

  ngOnInit() {
    /*var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/custom.js";
    this.elementRef.nativeElement.appendChild(s);*/

    this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
    //console.log(this.user);
  }
  logout() {
    localStorage.removeItem(SystemConstants.CURRENT_USER);
    this.utilityService.navigate(UrlConstants.LOGIN);
  }
}
