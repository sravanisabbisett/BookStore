import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpService) { }

  registration(data: any){
    console.log("data in user service",data);
    return this.http.post('User/Register',data);
  }

  login(data:any){
    console.log("data in user service",data);
    return this.http.post('User/Login',data);
  }
}
