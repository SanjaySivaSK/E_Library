import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlEndpoint } from '../utils/constant';

import { AppResponse } from '../model/appResponse';
import { Author } from '../model/author';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  constructor(private http: HttpClient) {}

  getAuthors(): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      'http://localhost:8080/api/admin/author/all'
    );
  }
  addAuthor(author: Author): Observable<AppResponse> {
    return this.http.post<AppResponse>(
      'http://localhost:8080/api/admin/author ',
      author
    );
  }
  updateAuthor(author: Author): Observable<AppResponse> {
    return this.http.put<AppResponse>(
      'http://localhost:8080/api/admin/author ',
      author
    );
  }
  deleteAuthor(id: number): Observable<AppResponse> {
    const url = `http://localhost:8080/api/admin/author/${id}`;
    return this.http.delete<AppResponse>(url);
  }
}
