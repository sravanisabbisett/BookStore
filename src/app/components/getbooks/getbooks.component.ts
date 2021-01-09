import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/bookservice/book.service';

@Component({
  selector: 'app-getbooks',
  templateUrl: './getbooks.component.html',
  styleUrls: ['./getbooks.component.scss']
})
export class GetbooksComponent implements OnInit {

  constructor(private bookService: BookService,private router:Router) { }

 // booksArray=[]
  booksArray: Array<any> = [];
  wishlist: Array<any> = [];
  books:Array<any>=[];
  bag:any;
  

  ngOnInit() {
    this.getAllBooks();
  }

  getAllBooks(){
    this.bookService.getBook().subscribe((response:any)=>{
      console.log(response);
      this.booksArray=response['data']
      console.log(" books array " ,this.booksArray);
    })
}


addcart(book: any){
  book.addedToCart=false;
  for(let b of this.booksArray){
    if(book.product_id==b.product_id){
      book.addedToCart=true;
    }
  }
 this.bookService.AddCart(book).subscribe((res)=>{
   console.log("AddBookSucess",res)
   this.getCartItems();
 })


}

getCartItems(){
  this.bookService.getCartItems().subscribe((response:any)=>{
   console.log(response);
   this.books=response['result']
   console.log("booksArray",this.books);
   console.log("length of array",this.books.length)
   this.bag=this.books.length;
   console.log("bag value in get components:",this.bag)
 })  
 
}

review() {
  return Math.floor(Math.random() * (5 - 1) + 1)
}

}
