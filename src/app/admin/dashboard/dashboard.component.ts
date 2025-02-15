import { Component, OnInit } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
constructor(private bookService: BookService,private audioService: AudioService,private userService: UserService){}

booksLength: any = 0;
audiosLength: any = 0;
usersLength: any = 0;

   ngOnInit(): void{
      this.bookService.getAllBooks().subscribe((res: any)=>{
      this.booksLength = res.length;
      }) ;

      this.audioService.getAllAudios().subscribe((res: any)=>{
        this.audiosLength = res.length;
      });

      this.userService.getAllUsers().subscribe((res: any)=>{
       this.usersLength = res.length;
      })
   }
}
