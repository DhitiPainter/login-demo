import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';

import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, ObservableInput, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AuthService } from '../services';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  isRefreshingToken: boolean;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.isRefreshingToken = false;
  }

  addToken(req: HttpRequest<any>, token: string | null): HttpRequest<any> {
    if (token) {
      return req.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
    } else {
      return req;
    }
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(this.addToken(req, this.authService.getAuthToken()))
      .pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // do stuff with response if you want
            return event;
          } else {
            return null;
          }
        }),
        catchError((err: any) => {
          if (err instanceof HttpErrorResponse) {
            switch (err.status) {
              case 400:
                this.snackBar.open(
                  err.error.ResponseException.ExceptionMessage,
                  'Error',
                  {
                    duration: 2500,
                    verticalPosition: 'bottom',
                  }
                );
                return this.handle400Error(err);
              case 401:
                this.snackBar.open(
                  err.error.message
                    ? err.error.message
                    : err.error.ResponseException.ExceptionMessage,
                  'Error',
                  {
                    duration: 2500,
                    verticalPosition: 'bottom',
                  }
                );
                return throwError(err);
              case 403:
                this.snackBar.open(
                  err.error.ResponseException.ExceptionMessage,
                  'Error',
                  {
                    duration: 2500,
                    verticalPosition: 'bottom',
                  }
                );
                return throwError(err);
              case 500:
                this.snackBar.open(
                  err.error.ResponseException.ExceptionMessage,
                  'Error',
                  {
                    duration: 2500,
                    verticalPosition: 'bottom',
                  }
                );
                return throwError(err);
              case 422:
                this.snackBar.open(
                  err.error.ResponseException.ExceptionMessage,
                  'Error',
                  {
                    duration: 2500,
                    verticalPosition: 'bottom',
                  }
                );
                return throwError(err);
              default:
                return throwError(err);
            }
          } else {
            return throwError(err);
          }
        })
      );
  }

  handle400Error(error: any): Observable<never> {
    if (
      error &&
      error.status === 400 &&
      error.error &&
      error.error.error === 'invalid_grant'
    ) {
      // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
      return this.logoutUser(error);
    }
    // return Observable.throw(error);
    return throwError(error);
  }

  logoutUser(err: any): Observable<never> {
    this.authService.logout();
    return throwError(err);
    // Route to the login page (implementation up to you)
    // return Observable.throw('');
  }
}
