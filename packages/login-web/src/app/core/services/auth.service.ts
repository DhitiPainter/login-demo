import { Injectable } from '@angular/core';

import { CommonService } from './common.service';
import { Roles } from '../common.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtToken = 'auth-token';
  userRole = 'user-role';

  constructor(private commonService: CommonService) {}

  getAuthToken(): string | null {
    return localStorage.getItem(this.jwtToken);
  }

  setAuthToken(token: string): any {
    localStorage.setItem(this.jwtToken, token);
  }

  destroyToken(): any {
    window.localStorage.removeItem(this.jwtToken);
  }
  setSessionRole(role: any): any {
    const sessionRole: any = this.commonService.userRoles.find(
      (x: any) => x.name === role
    );
    switch (sessionRole.name) {
      case Roles.admin:
        sessionStorage.setItem(this.userRole, Roles.admin);
        break;
      case Roles.employee:
        sessionStorage.setItem(this.userRole, Roles.employee);
        break;
      case Roles.client:
        sessionStorage.setItem(this.userRole, Roles.client);
        break;
      default:
        break;
    }
  }

  getSessionRole(): any {
    return sessionStorage.getItem(this.userRole);
  }

  logout(): any {
    localStorage.clear();
    sessionStorage.clear();
  }
}
