import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppResponse } from '../model/appResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReturnBookService {

  constructor(private http:HttpClient) { }

  returnedBook(): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      'http://localhost:8080/api/admin/return/returnedBook'
    );
  }
  returnBook(id: number) {
    console.log(id);

    const url = `http://localhost:8080/api/user-book/${id}`;
    return this.http.put<AppResponse>(url, null);
  }
}
