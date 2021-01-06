import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/bookservice/book.service';
import { UserService } from 'src/app/services/userservice/user.service';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.scss']
})
export class MycartComponent implements OnInit {

  price = new Array(5).fill(1)
  books:Array<any>=[]
  constructor(private router:Router,private bookservice:BookService) { }
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
   this.getCartItems();
  }

  num:any=1;
  step = 0;
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }

  /* additem(){
    this.num++
  }

  remove(num:any){
    this.num--;
    if(this.num==0){
      this.removeitem(num)
    }
  } */

  addItem(index:any) {
    this.price[index] = ++this.num
  }

  remove(index:any) {
    if (this.num > 0)
      this.price[index] = --this.num
  }

  checkout(){
    this.router.navigate(['order'])
  }

  getCartItems(){
    this.bookservice.getCartItems().subscribe((response:any)=>{
      console.log(response);
      this.books=response['result']
      console.log("booksArray",this.books);
    })
  }

  removeitem(num:any){
    this.books.splice(num, 1);
    localStorage.setItem('questions',JSON.stringify(this.books));
  }
  removeCartItem(data:any){
    this.books.splice(data,1);
    this.bookservice.removeCartItem(data.product_id).subscribe((res:any)=>{
      console.log("cart Item removed sucessfully",res);
    })
  }


}


