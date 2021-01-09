import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/bookservice/book.service';
import { UserService } from 'src/app/services/userservice/user.service';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.scss'],
   
})
export class MycartComponent implements OnInit {


  @Output() length!:number;
  price = new Array(5).fill(1)
  books:Array<any>=[]
  constructor(private router:Router,
              private bookservice:BookService,
              private snackbar:MatSnackBar,
              private userservice:UserService,
              private formBuilder:FormBuilder) { }
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
   this.getCartItems();
   
   console.log("length of bag count in my cart:",this.length);
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

  addItem(book:any) {
    this.num++;
    this.bookservice.updateQuantity(book).subscribe((response=>{
      console.log("quantityadded sucessfully",response);
    }))
  }

  

  remove(product_id: any,quantity: any){
    this.num--;
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
     this.bookservice.getCartItems().subscribe((response:any)=>{
      console.log(response);
      this.books=response['result']
      console.log("booksArray",this.books);
      console.log("length of array",this.books.length)
      this.length=this.books.length;
    })  
    
  }

  removeCartItem(data:any){
    this.books.splice(data,1);
    this.bookservice.removeCartItem(data.product_id).subscribe((res:any)=>{
      console.log("cart Item removed sucessfully",res);
    })
  }

}


