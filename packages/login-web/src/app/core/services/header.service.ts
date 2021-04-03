import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  showSideBar = false;
  cartCount = 0;

  toggleSideBar() {
    this.showSideBar = !this.showSideBar;
  }

  getCartItemCounts() {
    return this.cartCount;
  }
}
