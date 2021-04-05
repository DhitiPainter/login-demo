import { Component, OnInit } from '@angular/core';
import { BroadcastService } from 'src/app/core/services/broadcast.service';
import { BroadcastKeys } from 'src/app/core/common.constant';
import { HeaderService } from 'src/app/core/services';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  constructor(
    private broadcastService: BroadcastService,
    public headerService: HeaderService
  ) {}

  ngOnInit(): any {
    this.broadcastService.on(BroadcastKeys.headerSearchValue).subscribe((x) => {
      console.log(x);
    });
  }
}
