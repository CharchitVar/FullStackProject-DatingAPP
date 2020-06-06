import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../_service/AuthService.service';
import { AlertifyService } from '../_service/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  model: any = {};
  constructor(
    public authService: AuthServiceService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {}

  login() {
    this.authService.login(this.model).subscribe(
      (value) => {
        this.alertify.success('Logged In Successfully');
      },
      (error) => {
        this.alertify.error(error);
        this.model = {};
      },
      ()=>{
        this.router.navigate(['/members']);
      }
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }
  logout() {
    localStorage.removeItem('token');
    this.alertify.message(' Logged Out Sucesssully');
    this.model = {};
    this.router.navigate(['/home']);
  }
}
