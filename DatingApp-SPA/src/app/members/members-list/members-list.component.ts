import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_service/user.service';
import { AlertifyService } from '../../_service/alertify.service';
import { User } from '../../_models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {

  users: User[];
  constructor( private userService: UserService, private alertify:AlertifyService,private route:ActivatedRoute) { }

  ngOnInit() {

    this.route.data.subscribe((data)=>{
      this.users = data['users'];
    })

  }


}
