import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  private api_url = 'http://localhost:8080/audios';

  private getHeaders(): HttpHeaders {
    const token = this.cookieService.get('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  };

  getAudioById(audioId: String) {
    const headers = this.getHeaders();
    return this.http.get(`${this.api_url}/get/${audioId}`, { headers });
  }

  getAllAudios() {
    const headers = this.getHeaders();
    return this.http.get(`${this.api_url}/get-all`, { headers });
  }

  getAudioByBookId(bookId: string) {

    const headers = this.getHeaders();
    return this.http.get(`${this.api_url}/get-by-book/${bookId}`, { headers });
  }

  updateAudioById(id: String, data: any) {
    const headers = this.getHeaders();
    return this.http.put(`${this.api_url}/update/${id}`, data, { headers });
  };

  addAudioFile(data: any) {
    const headers = this.getHeaders();
    return this.http.post(`${this.api_url}/add`, data, { headers });
  };

  deleteAudioFile(id: any) {
    const headers = this.getHeaders();
    return this.http.delete(`${this.api_url}/delete/${id}`, { headers });
  };
}
