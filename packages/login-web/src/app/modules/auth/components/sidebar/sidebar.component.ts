import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnChanges,
  Input,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

import { HeaderService, AuthService } from 'src/app/core/services';
import { SideBar } from './../../../../core/common.constant';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          height: '*',
        })
      ),
      state(
        'closed',
        style({
          height: '0px',
        })
      ),
      transition('open => closed', [animate('250ms ease-in-out')]),
      transition('closed => open', [animate('250ms ease-in-out')]),
    ]),
  ],
})
export class SidebarComponent implements OnInit, OnChanges {
  events: string[] = [];
  @Input() opened: boolean;
  sidebarList: any[];
  userRole: any;

  constructor(
    protected headerService: HeaderService,
    private router: Router,
    private authService: AuthService
  ) {
    this.userRole = this.authService.getSessionRole();
    this.sidebarList = [];
    this.opened = true;
  }

  ngOnChanges(sub: SimpleChanges): any {
    if (sub.opened && sub.opened.currentValue !== sub.opened.previousValue) {
      this.opened = sub.opened.currentValue;
    }
  }

  ngOnInit(): any {
    this.opened = this.headerService.showSideBar;

    this.sidebarList = SideBar.map((x) => {
      const obj: any = Object.assign({}, x);
      obj.hasAccess = x.access.includes(this.userRole);
      if (x.subMenus) {
        obj.isExpanded = false;
        const subList = x.subMenus.map((sub) => {
          const subObj: any = Object.assign({}, sub);
          subObj.hasAccess = sub.access.includes(this.userRole);
          return subObj;
        });
        obj.subMenus = subList;
      }
      return obj;
    });
  }

  onClickMenuItem(nav: any): any {
    if (nav.subMenus) {
      this.sidebarList[this.sidebarList.indexOf(nav)].isExpanded = !this
        .sidebarList[this.sidebarList.indexOf(nav)].isExpanded;
    } else {
      this.router.navigateByUrl(`${[nav.route]}`);
    }
  }
}
