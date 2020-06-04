import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  isRegisterMode: boolean =false;
  ngOnInit() {
  }

  registerToggle(){
    this.isRegisterMode = !this.isRegisterMode;
  }
  isCancelClicked(value){
    if(value){
      this.isRegisterMode = !value;
    }
    
  }

}
