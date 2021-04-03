import { Injectable } from '@angular/core';
import { throwError, interval, Observable } from 'rxjs';
import { catchError, flatMap } from 'rxjs/operators';

import { HttpClientService } from 'src/app/core/interceptors/http-client.service';
import { BroadcastService } from './broadcast.service';
import { BroadcastKeys } from '../common.constant';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  userRoles = [];

  constructor(
    private httpService: HttpClientService,
    private broadcastService: BroadcastService
  ) {}

  getRoles() {
    return new Observable((observer) =>
      observer.next([
        {
          id: 1,
          name: 'Admin',
        },
        {
          id: 2,
          name: 'Employee',
        },
        {
          id: 3,
          name: 'Client',
        },
      ])
    );
  }

  getUserRoles() {
    interval(30 * 1000)
      .pipe(
        catchError((error) => {
          return throwError(error);
        }),
        flatMap(() => this.getRoles())
      )
      .subscribe((response: any) => {
        this.onRoleSuscription(response);
      });
  }

  private onRoleSuscription(response: any) {
    this.userRoles = response;
    this.broadcastService.broadcast(BroadcastKeys.userRoles, response);
  }
}
