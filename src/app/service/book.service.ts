import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { Book } from '../model/book';
import { BookItem } from '../model/book-item';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}
  getbooks(): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      'http://localhost:8080/api/admin/book/all'
    );
  }
  addBooks(formdata: FormData): Observable<AppResponse> {
    return this.http.post<AppResponse>(
      'http://localhost:8080/api/admin/book/create',
      formdata
    );
  }
  updateBooks(book: BookItem): Observable<AppResponse> {
    return this.http.put<AppResponse>(
      'http://localhost:8080/api/admin/book',
      book
    );
  }
  deleteBooks(id: number): Observable<AppResponse> {
    const url = `http://localhost:8080/api/admin/book/${id}`;
    return this.http.delete<AppResponse>(url);
  }
 
  

}
