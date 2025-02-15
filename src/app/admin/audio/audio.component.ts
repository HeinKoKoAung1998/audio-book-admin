import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AudioService } from 'src/app/services/audio.service';
import { BookService } from 'src/app/services/book.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnInit {

  constructor(private audioService: AudioService, private bookService: BookService, private router: Router, private rout: ActivatedRoute, private sweetService: SweetalertService) { };

  id!: string;
  audiosOfBookList: any = [];
  allAudiosList: any = [];
  bookData: any;
  
  searchQuery: string = '';





  ngOnInit(): void {
    this.id = this.rout.snapshot.params['book-id'];

    if(this.id ){
      this.getAudioByBook();
      this.getBookById();
    }
    this.getAllAudios();

    console.log(this.bookData);
    console.log(this.id);
  }

  getAllAudios() {
    this.audioService.getAllAudios().subscribe((audios) => {
      this.allAudiosList = audios;
    });
  };

  getAudioByBook() {
    this.audioService.getAudioByBookId(this.id).subscribe((audios) => {
      console.log(audios);
      this.audiosOfBookList = audios;
    })
  };

  getBookById() {
    this.bookService.getBookById(this.id).subscribe((book: any) => {
      console.log(book);

      this.bookData = book;
    })
  }

  deleteAudio(id: any) {
    this.audioService.deleteAudioFile(id).subscribe((res)=>
    console.log(res));
    this.getAllAudios();
    this.getAudioByBook();
  }

  deleteItem(id: any) {
    this.sweetService.confirmDelete(() => {
      this.deleteAudio(id);
    })
  };

  searchAudio() {
    this.allAudiosList = this.allAudiosList.filter((audio: any) => 
      audio.title.toLowerCase().includes(this.searchQuery.toLowerCase().trim())  
    );

    this.audiosOfBookList = this.audiosOfBookList.filter((audio: any) => 
      audio.title.toLowerCase().includes(this.searchQuery.toLowerCase().trim())  
    );
  }
}
