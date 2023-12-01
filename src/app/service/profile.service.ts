import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { StorageService } from './storage.service';
import { AppUser } from '../model/appUser';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor( private http:HttpClient,private storageservice:StorageService) { }

  getUserdetail(): Observable<AppResponse> {
    let user:AppUser=this.storageservice.getLoggedInUser();
    console.log(user.id);
    
    return this.http.get<AppResponse>(
      " http://localhost:8080/api/admin/users/"+user.id
    
    );
  }  
}