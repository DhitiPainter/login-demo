import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';

import {
  NonAuthService,
  AuthService,
  BroadcastService,
} from 'src/app/core/services';
import { BroadcastKeys } from 'src/app/core/common.constant';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  userRoleId: any;
  loginForm: FormGroup;
  rolesSub: Subscription = new Subscription();
  roles: any[] = this.commonService.userRoles;
  error: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private nonAuthService: NonAuthService,
    private authService: AuthService,
    private broadcastService: BroadcastService,
    private commonService: CommonService,
    public matDialog: MatDialog
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): any {
    this.rolesSub = this.broadcastService
      .on(BroadcastKeys.userRoles)
      .subscribe((data: any) => {
        this.roles = data;
      });
  }

  ngOnDestroy(): any {
    this.rolesSub.unsubscribe();
    this.error = null;
  }

  loginUser(form: any): any {
    if (this.loginForm.invalid) {
      return;
    }
    this.nonAuthService.loginUser(form.value).subscribe((response: any) => {
      this.authService.setAuthToken(response.token);
      window.location.reload();
    });
  }

  clearLocalStorage(): any {
    this.authService.logout();
    this.router.navigate(['./login']);
  }
}
