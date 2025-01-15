import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

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

  register(user: any) {
    return this.http.post(`${this.api_url}/signup`, user);
  };

  login(credential: any) {
    return this.http.post(`${this.api_url}/login`, credential);
  };

  logout() {
    this.cookieService.delete('email');
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  };

  getAllUsers() {
    const headers = this.getHeaders();
    return this.http.get(`${this.api_url}/get-all`, {headers});
  };

  // getUserById(id: any) {
  //   const headers = this.getHeaders();
  //   return this.http.get(`${this.api_url}/get/${id}`, { headers });
  // };

    updateUserRole(credential: any) {
    const headers = this.getHeaders();
    return this.http.put(`${this.api_url}/update-role`, credential, { headers });
    };

    deleteUserById(id: string){
      const headers = this.getHeaders();
      return this.http.delete(`${this.api_url}/delete-by-id/${id}`,{headers});
    }


}