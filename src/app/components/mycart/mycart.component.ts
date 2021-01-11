import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/bookservice/book.service';
import { CartService } from 'src/app/services/cartService/cart.service';
import { UserService } from 'src/app/services/userservice/user.service';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.scss'],
   
})
export class MycartComponent implements OnInit {


  price:any;
  bag!: any;
  @Input() childMessage: number | undefined;
  books:Array<any>=[]
  constructor(private router:Router,
              private bookservice:BookService,
              private snackbar:MatSnackBar,
              private userservice:UserService,
              private formBuilder:FormBuilder,
              private cartservice:CartService) { }
  customerForm!: FormGroup;
  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      fullname: ['',[Validators.required]],
      phone: ['',[Validators.required]],
      pincode:['',[Validators.required]],
      fullAddress:['',[Validators.required]],
      email:['',[Validators.required]],
      city:['',[Validators.required]],
      state:['',[Validators.required]],
   });
   //this.bag=this.cartservice.getCartItems();
   this.getCartItems();
  }

  Customer = (customerForm: { fullname: any; phone:any; pincode:any; fullAddress:any;email: any;city:any;state:any; }) => {
    try {
      let newUser = {
        fullname: customerForm.fullname,
        phone: customerForm.phone,
        pincode:customerForm.pincode,
        fullAddress: customerForm.fullAddress,
        email:customerForm.email,
        city:customerForm.city,
        state:customerForm.state}
        
        this.userservice.customerDetails(newUser).subscribe((response)=>{
          console.log("Customer details added sucessfully sucessfully",response);
        })
    } catch (error) {
      console.log(error);

    }
  } 

  public hasError=(controlName:string,errorName:string)=>{
    return this.customerForm.controls[controlName].hasError(errorName);
  }

  num:any=1;
  step = 0;
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }

  addItem(book:any,action:any) {
    if (book.quantityToBuy > book.product.quantity) {
      this.snackbar.open('you cannot make quantity more than ', action, {
        duration: 2000,
      });
    } else {
      this.bookservice.updateQuantity(book).subscribe((data) => {
        console.log(data, 'quantity increased');
        this.getCartItems();
        //this.bag=this.cartservice.getCartItems();
      });
    }
  }

  

  remove(book: any,quantity: any,action:any){
    if (book.quantityToBuy > 1) {
      this.bookservice
        .reduceQuantity(book.product_id, quantity)
        .subscribe((result:any) => {
          book.isValid = true;
          this.getCartItems();
          //this.bag=this.cartservice.getCartItems();
        });
    } else {
      this.snackbar.open('You cannot make quantity less than', action, {
        duration: 2000,
      });
      book.isValid = false;
    }

  }
  checkout(){
    this.router.navigate(['order'])
  }

  getCartItems(){
     this.bookservice.getCartItems().subscribe((response:any)=>{
      console.log(response);
      this.books=response['result']
       console.log("booksArray",this.books);
       console.log("length of array",this.books.length)
       this.bag=this.books.length;
     })  
    
  }

  removeCartItem(data:any){
    this.books.splice(data,1);
    this.bookservice.removeCartItem(data.product_id).subscribe((res:any)=>{
      console.log("cart Item removed sucessfully",res);
      this.getCartItems();
      //this.bag=this.cartservice.getCartItems();
      
    })
  }

  orderPlaced(book: any){
    this.userservice.orderPlaced(book).subscribe(res=>{
      console.log('orderPlaced sucessfully', res);
      this.checkout();
    })
  }

}


