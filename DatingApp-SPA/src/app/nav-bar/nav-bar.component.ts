import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../_service/AuthService.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  model : any ={};
  constructor(private authService: AuthServiceService) { }

  ngOnInit() {
  }

  login(){
    this.authService.login(this.model).subscribe((value)=>{
      console.log("Logged In Successfully");
    },(error)=>{
      console.log('Failed To Login');
    })
    
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return !!token;
  }
  logout(){
    localStorage.removeItem('token');
    this.model={};
  }
}
