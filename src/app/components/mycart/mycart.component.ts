import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/bookservice/book.service';
import { UserService } from 'src/app/services/userservice/user.service';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.scss']
})
export class MycartComponent implements OnInit {

  @Output() length!:number;
  price = new Array(5).fill(1)
  books:Array<any>=[]
  constructor(private router:Router,private bookservice:BookService,private snackbar:MatSnackBar) { }
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
   
   console.log("length of bag count in my cart:",this.length);
  }

  num:any=1;
  step = 0;
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }

  addItem(book:any) {
    this.bookservice.updateQuantity(book).subscribe((response=>{
      this.num++;
      console.log("quantityadded sucessfully",response);
    }))
  }

  

  remove(product_id: any,quantity: any){
    this.bookservice.reduceQuantity(product_id,quantity).subscribe((response=>{
      console.log("quantity removed sucessfully",response);
      /*if (this.num > 1) {
        this.num--;
      } else {
        this.snackbar.open('You cannot make quantity less than', action, {
          duration: 2000,
        });
      }*/
    }))

  }
  checkout(){
    this.router.navigate(['order'])
  }

  getCartItems(){
     var item=this.bookservice.getCartItems().subscribe((response:any)=>{
      console.log(response);
      this.books=response['result']
      console.log("booksArray",this.books);
      console.log("length of array",this.books.length)
    })  
    console.log("item is",item);
    return item
  }

  removeCartItem(data:any){
    this.books.splice(data,1);
    this.bookservice.removeCartItem(data.product_id).subscribe((res:any)=>{
      console.log("cart Item removed sucessfully",res);
    })
  }

}


