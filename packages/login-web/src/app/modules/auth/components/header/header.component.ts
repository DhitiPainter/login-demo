import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BroadcastService } from 'src/app/core/services/broadcast.service';
import { AuthService, HeaderService } from 'src/app/core/services';
import { BroadcastKeys } from 'src/app/core/common.constant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  notifications = null;
  search = '';
  cartItemsCount = 0;
  constructor(
    private router: Router,
    private broadcastService: BroadcastService,
    private authService: AuthService,
    public headerService: HeaderService
  ) {}

  ngOnInit(): any {
    this.cartItemsCount = this.headerService.getCartItemCounts();
    this.broadcastService.on(BroadcastKeys.cartCount).subscribe(() => {
      this.cartItemsCount = this.headerService.getCartItemCounts();
    });
  }

  toggleSide(): void {
    this.headerService.toggleSideBar();
  }

  onSearch(): any {
    this.broadcastService.broadcast(
      BroadcastKeys.headerSearchValue,
      this.search
    );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
