import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-bar',
  templateUrl: './logout-bar.component.html',
  styleUrls: ['./logout-bar.component.scss']
})
export class LogoutBarComponent implements OnInit {

  shouldBeVisible()
  {
    return this.authenticationService.isUserLoggedIn;
  }

  logout()
  {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

  constructor(private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

}
