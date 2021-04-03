import { Component, OnInit } from '@angular/core';
import { BroadcastKeys } from './core/common.constant';
import { BroadcastService } from './core/services';
import { CommonService } from './core/services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private commonService: CommonService,
    private broadcastService: BroadcastService
  ) {}

  ngOnInit() {
    this.commonService.getRoles().subscribe((response: any) => {
      this.commonService.userRoles = response;
      this.broadcastService.broadcast(BroadcastKeys.userRoles, response);
      this.commonService.getUserRoles();
    });
  }
}
