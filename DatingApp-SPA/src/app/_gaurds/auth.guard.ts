import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../_service/AuthService.service';
import { AlertifyService } from '../_service/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private authService: AuthServiceService, private router: Router, private alertify: AlertifyService){

  }
  canActivate():  boolean {
    if(this.authService.loggedIn()){
      return true;

    }
    this.alertify.error('Please Logged In First !');
    this.router.navigate(['/home']);
    return false;
    
  }
  
}
