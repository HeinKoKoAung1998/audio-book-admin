import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

  private api_url = 'http://localhost:8080/users';

  private getHeaders(): HttpHeaders {
    const token = this.cookieService.get('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  };


  login(credential: any) : Observable<any> {
    return this.http.post(`${this.api_url}/login`, credential);
  };

  logout() : void{
    this.cookieService.delete('email');
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  };

  getMe() : Observable<User> {
    const headers = this.getHeaders();
    return this.http.get<User>(`${this.api_url}/get-me`, { headers });
  }

  getUserById(id: string) : Observable<User> {
    const headers = this.getHeaders();
    return this.http.get<User>(`${this.api_url}/get/${id}`, { headers });
  }

  getAllUsers(): Observable<User[]> {
    const headers = this.getHeaders();
    return this.http.get<User[]>(`${this.api_url}/get-all`, { headers });
  };

  updateUserRole(credential: any ) : Observable<any> {
    const headers = this.getHeaders();
    return this.http.patch(`${this.api_url}/update-role`,credential,{ headers });
  };

  deleteUserById(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.api_url}/delete-by-id/${id}`, { headers });
  }

  getActiveUsers() : Observable<User[]> {
    const headers = this.getHeaders();
    return this.http.get<User[]>('http://localhost:8080/active/get-all', { headers });
  };

  forgotPassword(email: any){
    return this.http.post(`http://localhost:8080/users/forgot-password`,{email});
  }
}