import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../model/category';
import { Observable } from 'rxjs';
import { urlEndpoint } from '../utils/constant';
import { AppResponse } from '../model/appResponse';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  

  constructor(private http: HttpClient) { }

  getCategories():  Observable<AppResponse>{
   
        return this.http.get<AppResponse>("http://localhost:8080/api/admin/category/all");
      
  }
  addCategories(category:Category):Observable<AppResponse>{
    return this.http.post<AppResponse>("http://localhost:8080/api/admin/category ",category);
  }
  updateCategories(category:Category):Observable<AppResponse>{
    return this.http.put<AppResponse>("http://localhost:8080/api/admin/category ",category);
 
}
deleteCategory(id:number):Observable<AppResponse>{
  return this.http.delete<AppResponse>(`http://localhost:8080/api/admin/category/${id}`);
}
// deleteCategory(id: number): Observable<AppResponse> {
//   const url = `http://localhost:8080/api/admin/category/${id}`;
//   return this.http.delete<AppResponse>(url);
// }
}
