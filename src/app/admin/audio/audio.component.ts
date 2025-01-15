import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AudioService } from 'src/app/services/audio.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnInit {

  constructor(private audioService: AudioService, private bookService: BookService, private router: Router, private rout: ActivatedRoute) { };

  id!: string;
  audioList: any = [];
  bookData: any;
  viewMode: boolean = false;


  ngOnInit(): void {
    this.id = this.rout.snapshot.params['book-id'];
    this.getAudioByBook();
    this.getBookById();

    console.log(this.audioList);
    console.log(this.bookData);
    console.log(this.id);
  }

  getAudioByBook() {
    this.audioService.getAudioByBookId(this.id).subscribe((audios) => {
      console.log(audios);
      this.audioList = audios;
    })
  };

  getBookById() {
    this.bookService.getBookById(this.id).subscribe((book: any) => {
      console.log(book);

      this.bookData = book;
      // if (book.cover_image_url) {
      //   this.bookService.fetchPhoto(`uploads/${book.cover_image_url}`).subscribe((url: any) => {
      //     this.bookData = {
      //       title: book.title,
      //       author: book.author,
      //       description: book.description,
      //       cover_image_url: url
      //     }
        // })

      // } else {
      //   this.bookData = book;
      // }

    })
  }

 

  
 
}
