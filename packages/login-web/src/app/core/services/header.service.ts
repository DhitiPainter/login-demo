import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  showSideBar = false;
  cartCount = 0;

  toggleSideBar(): any {
    this.showSideBar = !this.showSideBar;
  }

  getCartItemCounts(): any {
    return this.cartCount;
  }
}
