import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/comment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userPayload:any;
  constructor(private http:HttpClient, private route:Router) {

   }

  userRegister(userOb:any) {
    return this.http.post<any>("https://localhost:44322/api/User/register" ,userOb)


   }

   userlogin(userObj:any) {
     return this.http.post<any>("https://localhost:44322/api/User/authenticate" ,userObj)
   }

   storeToken(tokenvalue:string) {
     localStorage.setItem('token', tokenvalue);

   };

   storeId(id:string) {
    localStorage.setItem('id',id)
   }

   getToken() {
     localStorage.getItem('token')
   };

   getId() {
    localStorage.getItem('id')
   };

   storeRefreshToken(tokenValue: string){
    localStorage.setItem('refreshToken', tokenValue)
  }

   isLoggedIn() :boolean{
     return !!localStorage.getItem('token')

   }



  getfullNameFromToken(){
    if(this.userPayload)
    return this.userPayload.name;
  }

  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;

  }

  createComment(comment: Comment): Observable<Comment> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<Comment>('https://localhost:44322/api/Comment/AddComment', comment, httpOptions);
  }
}
