import { Injectable } from "@angular/core";
import { User } from '../_models/user';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { UserService } from '../_service/user.service';
import { AlertifyService } from '../_service/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthServiceService } from '../_service/AuthService.service';

@Injectable()
export class MemberEditResolver implements Resolve<User>{

    constructor(private userService: UserService,private router: Router, private alertify: AlertifyService, private authService:AuthServiceService) {
        
        
    }

    resolve(route: ActivatedRouteSnapshot): Observable<User>{
        return this.userService.getUserById(this.authService.decodedToken.nameid).pipe(
            catchError(error => {
                this.alertify.error('Problem Retriving In User  Data');
                this.router.navigate(['/members']);
                return of(null);
            })
        )
    }

}