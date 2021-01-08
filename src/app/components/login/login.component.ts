import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userservice/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  durationInSeconds=2;
  hide=true
  loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private route:Router,
              private userservice:UserService,
              private snackbar:MatSnackBar
              ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required ]]
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  loginUser(loginform:any) {
    let reqData = {
      email: loginform.email,
      password: loginform.password

    }
    console.log(reqData);
    this.userservice.login(reqData).subscribe((response:any)=>{
      console.log("login sucessfull",response['token']);
      localStorage.setItem('token',response['token']);
        this.snackbar.open('login sucessfull')
        this.route.navigate(['dashboard'])
    })
    
  }



}
