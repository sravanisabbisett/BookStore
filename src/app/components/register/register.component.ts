import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userservice/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  hide = true;
  constructor(private formBuilder: FormBuilder,private router:Router,private userservice:UserService) { }
  
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fullname: ['', [Validators.pattern("^[A-Z]{1}[a-z]{2,}"),Validators.required,Validators.minLength(3)]],
      email:['',[Validators.pattern("^[a-zA-Z0-9+_-]+(?:\\.[a-zA-Z0-9_-]+)*@[a-zA-Z0-9]+(?:\\.[a-zA-Z]{2,}){1,2}$"),Validators.required]],
      mobilenumber:['',[Validators.pattern("^[6-9]{1}[0-9]{9}$"),Validators.required]],
      password:['',[Validators.pattern("^(?=.*[0-9])" + "(?=.*[a-z])(?=.*[A-Z])" + "(?=.*[@#$%^&+=])" + "(?=\\S+$).{8,}$"),Validators.required,Validators.minLength(8)]],

   });
  
  }
  public hasError=(controlName:string,errorName:string)=>{
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  register = (registerForm: { fullname: any;email: any;mobilenumber:any; password: any; }) => {
    try {
      let newUser = {
        fullName: registerForm.fullname,
        email: registerForm.email,
        mobilenumber:registerForm.mobilenumber,
        password: registerForm.password}
        
         this.userservice.registration(newUser).subscribe((response)=>{
          console.log("User registered sucessfully",response);
        })
    } catch (error) {
      console.log(error);

    }
  } 
  login()
  {
    this.router.navigate(['login']);
  }

}
