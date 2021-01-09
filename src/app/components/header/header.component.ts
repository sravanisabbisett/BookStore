import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BookService } from 'src/app/services/bookservice/book.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  
})
export class HeaderComponent implements OnInit {

   
  header!: FormGroup;
  name:any;
  email:any;
  @Input() childMessage: number | undefined;
  bag=0;
  books:Array<any>=[]
  
  list:any;
  constructor(private formbuilder:FormBuilder, private bookservice:BookService) { }

  ngOnInit(): void {
    this.header=this.formbuilder.group({
      dataa:[""]
    });
    this.getCartItems();
  }

  getCartItems(){
    this.bookservice.getCartItems().subscribe((response:any)=>{
     console.log(response);
     this.books=response['result']
     console.log("booksArray",this.books);
     console.log("length of array",this.books.length)
     this.childMessage=this.books.length;
   })  
   
 }
  

}
