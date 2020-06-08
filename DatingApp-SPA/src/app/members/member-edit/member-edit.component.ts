import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_service/user.service';
import { AuthServiceService } from 'src/app/_service/AuthService.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  user: User;
  @ViewChild('editForm', { static: true }) editForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private userService: UserService,
    private authService: AuthServiceService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      console.log(data);
      this.user = data['user'];
    });
  }

  onUpdateUser() {
    console.log(this.user.interests);
    console.log(this.user.introduction);
    this.userService
      .updateUser(this.authService.decodedToken.nameid, this.user)
      .subscribe(
        () => {
          this.alertify.success('Profile Updated Successfully');
          this.editForm.reset(this.user);
        },
        (error) => this.alertify.error('Something Went Wrong on Updating')
      );
  }
}