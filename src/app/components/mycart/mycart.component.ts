import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.scss']
})
export class MycartComponent implements OnInit {

  
  books:Array<any>=[]
  constructor(private router:Router) { }
  customerForm!: FormGroup;
  ngOnInit(): void {
    this.customerForm = new FormGroup({
      firstName: new FormControl(),
      PhoneNumber: new FormControl(),
      PinCode:new FormControl(),
      Locality:new FormControl(),
      Address:new FormControl(),
      City:new FormControl(),
      LandMark:new FormControl(),
   });
    this.books=JSON.parse(localStorage.getItem('addedcart')!);
    console.log(this.books);

  }

  num:any=1;
  step = 0;
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }

  additem(){
    this.num++
  }

  remove(num:any){
    this.num--;
    if(this.num==0){
      this.removeitem(num)
    }
  }

  checkout(){
    this.router.navigate(['order'])
  }

  removeitem(num:any){
    this.books.splice(num, 1);
    localStorage.setItem('questions',JSON.stringify(this.books));
  }
}


