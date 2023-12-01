import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { urlEndpoint } from '../utils/constant';
import { AppResponse } from '../model/appResponse';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  error: String = '';
  constructor(private http: HttpClient) {}

  getAllBooks(): void {
    console.log('called');

    this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/book/all`).subscribe({
      next: (response) => {
        console.log(response.data);
        return response;
      },
      error: (err) => {
        let message: String = err.error.error.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
}
