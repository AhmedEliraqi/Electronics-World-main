import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private fullName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");


  constructor(public jwtHelper: JwtHelperService) { }

  public getRoleFromStore() {
    return this.role$.asObservable();
  }

  public setRoleForStore(role: string) {
    this.role$.next(role);
  }

  public getFullNameFromStore() {
    return this.fullName$.asObservable();
  }

  public setFullNameForStore(fullname: string) {
    this.fullName$.next(fullname)
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    // Check whether the token is expired
    return !this.jwtHelper.isTokenExpired(token);
  }

  public getUserName(): string {
    const token = localStorage.getItem('token');
    if (!token) { // Check for null or undefined value
      return '';
    }
    // Decode the token and return the user's name
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.unique_name;

  }
}
