import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthServiceService } from '../_service/AuthService.service';
import { combineAll } from 'rxjs/operators';
import { AlertifyService } from '../_service/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: User ;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  @Output() onCancelButtonClicked = new EventEmitter();
  constructor(
    private authService: AuthServiceService,
    private alertify: AlertifyService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass:'theme-red'
    },
    this.createRegisterFrom();
    //Form Group way
    // this.registerForm = new FormGroup(
    //   {
    //     userName: new FormControl('', Validators.required),
    //     password: new FormControl('', [
    //       Validators.required,
    //       Validators.minLength(4),
    //       Validators.maxLength(8),
    //     ]),
    //     confirmpassword: new FormControl('', [Validators.required]),
    //   },
    //   this.passwordMatchValidator
    // );
  }
  createRegisterFrom(){

    //Form Builder way
    this.registerForm = this.formBuilder.group({
      userName: ['',Validators.required],
      password: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
      confirmpassword: ['',[Validators.required]],
      gender: ['male',[Validators.required]],
      knownAs: ['',Validators.required],
      dateOfBirth: ['',Validators.required],
      city: ['',Validators.required],
      country: ['',Validators.required],
    },{validators: this.passwordMatchValidator})
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password').value ===
      formGroup.get('confirmpassword').value
      ? null
      : { mismatch: true };
  }
  register() {

    if(this.registerForm.valid){
      this.user= Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(()=>{
      this.alertify.success('Registration Successfull');
      this.authService.login(this.user).subscribe(()=>{
        this.router.navigate(['/members']);
      })

    },(error)=>{
      this.alertify.error(error);
    });

    }


    console.log(this.registerForm.value);
  }
  cancel() {
    this.onCancelButtonClicked.emit(true);
  }
}
