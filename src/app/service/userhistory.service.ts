
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../model/category';
import { Observable } from 'rxjs';
import { urlEndpoint } from '../utils/constant';
import { AppResponse } from '../model/appResponse';
import { StorageService } from './storage.service';
import { AppUser } from '../model/appUser';
@Injectable({
  providedIn: 'root'
})
export class UserhistoryService {
  

  constructor(private http: HttpClient ,private storageservice:StorageService) { }
  getUsersHistory(): Observable<AppResponse> {
   
    return this.http.get<AppResponse>("http://localhost:8080/api/admin/user-history/all");
  
}
getUserHistory(): Observable<AppResponse> {
  let user:AppUser=this.storageservice.getLoggedInUser();
  return this.http.get<AppResponse>(
    "http://localhost:8080/api/user-book/"+user.id
  );
}   

renewalBook(id:number){
  console.log(id);
    
    const url = `http://localhost:8080/api/user-book/Renewal/${id}`;
    return this.http.put<AppResponse>(url, null);


}
adminRenewalBook(renewalBook:any):Observable<AppResponse>{
    return this.http.put<AppResponse>('http://localhost:8080/api/admin/user-history/return-book ',
    renewalBook)
  
  

}
}


