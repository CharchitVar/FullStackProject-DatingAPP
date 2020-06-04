import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthServiceService } from '../_service/AuthService.service';
import { combineAll } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
model: any ={};
@Output() onCancelButtonClicked = new EventEmitter();
  constructor(private authService: AuthServiceService) { }

  ngOnInit() {
  }
  register(){
    this.authService.register(this.model).subscribe(()=>{
      console.log('Registration Sucessfull');
      
    },(error)=>{
      console.log(error);
    })
    
  }
  cancel(){
    this.onCancelButtonClicked.emit(true);
  }

}
