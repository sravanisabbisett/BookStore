import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpService: HttpService) { }

  getBook() {
    return this.httpService.get('bookstore_user/get/book');
  }
}
