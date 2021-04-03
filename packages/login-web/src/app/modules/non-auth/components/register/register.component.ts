import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { BroadcastService, NonAuthService } from 'src/app/core/services';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/core/services/common.service';
import { BroadcastKeys } from 'src/app/core/common.constant';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  rolesSub: Subscription = new Subscription;
  roles: any[] = this.commonService.userRoles;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private nonAuthService: NonAuthService,
    private broadcastService: BroadcastService,
    private commonService: CommonService,
    public matDialog: MatDialog
  ) {
    this.registerForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.rolesSub = this.broadcastService
    .on(BroadcastKeys.userRoles)
    .subscribe((data: any) => {
      this.roles = data;
    });
  }

  ngOnDestroy() {
    this.rolesSub.unsubscribe();
  }

  register() {
    if (this.registerForm.invalid) {
      return;
    }
    this.nonAuthService
      .registerUser(this.registerForm.value)
      .subscribe((response) => {
        this.router.navigate(['/login']);
      });
  }
}
