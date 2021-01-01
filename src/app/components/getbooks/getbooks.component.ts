import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/bookservice/book.service';

@Component({
  selector: 'app-getbooks',
  templateUrl: './getbooks.component.html',
  styleUrls: ['./getbooks.component.scss']
})
export class GetbooksComponent implements OnInit {

  constructor(private bookService: BookService) { }

 // booksArray=[]
  booksArray: Array<any> = [];
  
 
  ngOnInit() {
    this.getAllBooks();
  }

  getAllBooks(){
    this.bookService.getBook().subscribe((response)=>{
      console.log(response);
      this.booksArray=response['result']
      console.log(" books array " ,this.booksArray);
    })
}
addcart(){
  
}

review() {
  return Math.floor(Math.random() * (5 - 1) + 1)
}

}
