import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpService: HttpService) { }

  getBook() {
    return this.httpService.get('Product/GetProducts');
  }

  AddCart(data:any){
    return this.httpService.postCart('Cart/AddCart',data);
  }

  getCartItems(){
    return this.httpService.get('Cart/GetCartItems');
  }

  removeCartItem(data:any){
    console.log("data in remove item",data);
    return this.httpService.postCart('Cart/RemoveCartItem?productId='+data,{});
  }
}
