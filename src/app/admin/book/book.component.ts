import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { ToastrService } from 'ngx-toastr';
import { SweetalertService } from 'src/app/services/sweetalert.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(private bookService: BookService, private sweetService: SweetalertService) { }

  bookList: any = [];
  coverImageUrl: any;
  searchQuery: string = '';

  ngOnInit(): void {
    this.getAllBooks();

  };

  getAllBooks() {
    this.bookService.getAllBooks().subscribe((res: any) => {
    
      this.bookList = res;
      console.log(this.bookList);
    })
  };

  deleteBook(id: any) {
    this.bookService.deleteBook(id).subscribe((res)=>console.log(res));
      this.getAllBooks();
  }

  deleteItem(id: any) {
    this.sweetService.confirmDelete(() => {
      this.deleteBook(id)
    });
  };

  searchBooks() {
    this.bookList = this.bookList.filter((book: any) => 
      book.title.toLowerCase().includes(this.searchQuery.toLowerCase().trim()) || 
      book.author.toLowerCase().includes(this.searchQuery.toLowerCase().trim())
    );
  }
}
