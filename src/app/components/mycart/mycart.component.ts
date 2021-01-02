import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.scss']
})
export class MycartComponent implements OnInit {


  books:Array<any>=[]
  constructor() { }
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

  step = 0;
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
}


