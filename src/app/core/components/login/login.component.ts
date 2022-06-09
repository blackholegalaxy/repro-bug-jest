import { Component, OnInit } from '@angular/core';

import { AuthService } from '@core/services';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
  ) { }

  public ngOnInit() {
    this.authService.user$.subscribe(user => console.log(user));
  }
}
