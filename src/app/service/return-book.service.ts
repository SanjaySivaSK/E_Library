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
  returnBook(id: number,amt:number|null) {
    console.log(id);
    console.log(amt)

    const url = `http://localhost:8080/api/user-book/${id}/update/${amt}`;
    return this.http.put<AppResponse>(url, null);
  }
}
