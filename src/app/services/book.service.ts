import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router, private storage: AngularFireStorage) { }

  private api_url = 'http://localhost:8080/books';

  private getHeaders(): HttpHeaders {
    const token = this.cookieService.get('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  };

  uploadImage(selectedImage: String, bookData: any, isAddMode: boolean, id: any) {
    console.log(selectedImage);
    console.log(bookData);

    const filePath = `uploads/${selectedImage}_${new Date().getTime()}`;
    console.log(filePath);

    if (!selectedImage) {
      if (isAddMode) {
        this.addBook(bookData).subscribe((res) => {
          console.log(res)
        })
      } else {
        this.updateBook(id, bookData).subscribe((res) => {
          console.log(res);
        });
      }
    } else {

      this.storage.upload(filePath, selectedImage).then(() => {
        console.log('Image is uploaded successfully');
        this.storage.ref(filePath).getDownloadURL().subscribe(Url => {
          bookData.cover_image_url = Url;
          console.log(bookData.cover_image_url);

          if (isAddMode) {
            this.addBook(bookData).subscribe((res) => {
              console.log(res)
            })
          } else {
            this.updateBook(id, bookData).subscribe((res) => {
              console.log(res);
            });
          }
        })
      });
    }
  }

  addBook(bookData: any) {
    const headers = this.getHeaders();
    return this.http.post(`${this.api_url}/add`, bookData, { headers });
  }

  getAllBooks() {
    const headers = this.getHeaders();
    return this.http.get(`${this.api_url}/get-all`, { headers });
  };

  getBookById(bookId: string) {
    const headers = this.getHeaders();
    return this.http.get(`${this.api_url}/get/${bookId}`, { headers });
  }

  updateBook(id: any, credential: any) {
    const headers = this.getHeaders();
    return this.http.put(`${this.api_url}/update/${id}`, credential, { headers });
  }

  deleteBook(id: any) {
    const headers = this.getHeaders();
    return this.http.delete(`${this.api_url}/delete/${id}`, { headers });
  };



}