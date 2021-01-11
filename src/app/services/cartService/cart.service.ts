import { Injectable } from '@angular/core';
import { BookService } from '../bookservice/book.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private bookservice:BookService) { }
  books:Array<any>=[]
  length:any;
  getCartItems(){
    this.bookservice.getCartItems().subscribe((response:any)=>{
      console.log("data in cart service:",response);
      this.books=response['result']
      console.log("booksArray",this.books);
      console.log("length of array",this.books.length)
      this.length=this.books.length;
      console.log("length in cartservice",this.length);
    })
    return this.length;
  }
}
