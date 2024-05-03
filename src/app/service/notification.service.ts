import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { RequestBook } from '../model/request-book';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  
  

  constructor(private http: HttpClient) {}

  getNotification(): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      'http://localhost:8080/api/notification/message'
    );
  }
  clear(id: number) {
    console.log(id);

    const url = `http://localhost:8080/api/notification/${id}`;
    return this.http.put<AppResponse>(url,null);
  }
  RequestBook(requestBook:RequestBook): Observable<AppResponse>{
    return this.http.post<AppResponse>(
      `http://localhost:8080/api/notification/send`,requestBook

    )
  

  } 
  renewalBook():Observable<AppResponse>{
    return this.http.get<AppResponse>(
      'http://localhost:8080/api/admin/user-history/Renewal/message'
    );


  }
  remove(id: number):Observable<AppResponse> {
    console.log(id);

    const url = `http://localhost:8080/api/admin/user-history/remove/${id}`;
    return this.http.put<AppResponse>(url, null);
  }


  DeclineBook(id: number):Observable<AppResponse> {
    console.log(id);

    const url = `http://localhost:8080/api/notification/decline/${id}`;
    return this.http.put<AppResponse>(url, null);
  }

  GetDeclineBook(UserId: number):Observable<AppResponse> {
    console.log(UserId);

   
    return this.http.get<AppResponse>(`http://localhost:8080/api/notification/declined/${UserId}`);
  }
  Accept(id:number):Observable<AppResponse> {
    const url = `http://localhost:8080/api/notification/accept/${id}`;
    return this.http.put<AppResponse>(url, null);
   
  }

  }

