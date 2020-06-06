import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthServiceService } from '../_service/AuthService.service';
import { combineAll } from 'rxjs/operators';
import { AlertifyService } from '../_service/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
model: any ={};
@Output() onCancelButtonClicked = new EventEmitter();
  constructor(private authService: AuthServiceService, private alertify: AlertifyService) { }

  ngOnInit() {
  }
  register(){
    this.authService.register(this.model).subscribe(()=>{
      this.alertify.success('Registration Successfull');
      
    },(error)=>{
      this.alertify.error(error);
    })
    
  }
  cancel(){
    this.onCancelButtonClicked.emit(true);
  }

}
