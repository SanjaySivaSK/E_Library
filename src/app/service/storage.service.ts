import { Injectable } from '@angular/core';
import { AppUser } from '../model/appUser';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
 
  constructor() {}

  setLoggedInUser(user: AppUser): void {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  public getLoggedInUser(): AppUser {
    return JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  }

  public removeLoggedInUser(): void {
    localStorage.removeItem('loggedInUser');
  }
  setAuthData(authdata: string) {
    localStorage.setItem('authdata',authdata);
    
  }
  public getAuthdata(): string| null {
    return (localStorage.getItem('authdata') ||null);
  }
  public removeAuthData(): void {
    localStorage.removeItem('authdata');
  }

}
