import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_service/user.service';
import { AlertifyService } from '../../_service/alertify.service';
import { User } from '../../_models/user';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/_models/Pagination';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {

  users: User[];
  user: User = JSON.parse(localStorage.getItem('user'));
  genderList =[{value:'male', display:'Males'},{value:'female',display: 'Females'}]
  userParams: any = {};
  pagination: Pagination;
  constructor( private userService: UserService, private alertify:AlertifyService,private route:ActivatedRoute) { }

  ngOnInit() {

    this.route.data.subscribe((data)=>{
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    })
    this.userParams.gender = this.user.gender==='female'?'male':'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge =99;
    this.userParams.orderBy='lastActive';



  }

  resetFilters(){
    this.userParams.gender = this.user.gender==='female'?'male':'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge =99;

    this.loadUserForNewPage();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUserForNewPage();
  }

  loadUserForNewPage(){
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage,this.userParams)
    .subscribe((result:PaginatedResult<User[]>)=>{
      this.users= result.result;
      this.pagination = result.pagination;
  },
  (error)=> {
    this.alertify.error(error)
  });

}
}

