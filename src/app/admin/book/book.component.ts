import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit{

  constructor( private bookService: BookService){ }

  bookList : any = [];
  coverImageUrl: any ;
  
  ngOnInit(): void {
    this.getAllBooks();

    // this.bookService.fetchPhoto( `uploads/blueSky.jpg`).subscribe((url)=>{
    //   console.log(url);
    //   this.coverImageUrl = url;
    // })

  };

  getAllBooks(){
    this.bookService.getAllBooks().subscribe((res: any)=>{
      // console.log(res);
      this.bookList = res;
      console.log(this.bookList);
  })
      // this.bookList = res;
      // console.log( this.bookList );
    //   res.forEach(( result: any) => {
    //     if(result.cover_image_url)
    //     this.bookService.fetchPhoto(`uploads/${result.cover_image_url}`).subscribe(
    //      ( url: any )=> {
    //          var book = {
    //           book_id: result.book_id,
    //           title : result.title,
    //           author: result.author,
    //           description: result.description,
    //           cover_image_url : url 
    //          };

    //          this.bookList.push(book);
             
    //       }
    //     )
    //     else
    //     this.bookList.push(result);
    //   });
    // })

   
  };


  




}
