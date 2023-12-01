import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../model/category';
import { Observable } from 'rxjs';
import { urlEndpoint } from '../utils/constant';
import { AppResponse } from '../model/appResponse';
import { Issuebook } from '../model/issuebook';

@Injectable({
  providedIn: 'root'
})
export class IssuebookService {

  constructor(private http: HttpClient) { }

  getIssuebook(): Observable<AppResponse> {
   
        return this.http.get<AppResponse>("http://localhost:8080/api/admin/user-history/all");
      
  }
  issueBook(IssueBook:Issuebook):Observable<AppResponse>{
    return this.http.post<AppResponse>("http://localhost:8080/api/admin/user-history/issue-book ",IssueBook);
  }
}
