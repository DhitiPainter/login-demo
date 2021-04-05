import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/core/services';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  constructor(public headerService: HeaderService) {}
}
