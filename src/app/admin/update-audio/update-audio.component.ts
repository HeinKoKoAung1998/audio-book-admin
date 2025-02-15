import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { AudioService } from 'src/app/services/audio.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-update-audio',
  templateUrl: './update-audio.component.html',
  styleUrls: ['./update-audio.component.css']
})
export class UpdateAudioComponent implements OnInit {

  
  updateAudioForm: any = FormGroup;
  submitted = false;
  bookList: any;

  isAddMode!: boolean;
  
  bookId!: String;

  audioId! : String;
  loading! : boolean;


  constructor(private audioService: AudioService, private bookService: BookService, private formBuilder: FormBuilder, private http: HttpClient,private route: ActivatedRoute,private router: Router,private toastr: ToastrService) { };


  ngOnInit(): void {

    this.audioId = this.route.snapshot.params['audio-id'];
    this.bookId = this.route.snapshot.params['book-id'];
    this.isAddMode = !this.audioId ;
    
    this.updateAudioForm = this.formBuilder.group({
      book_id : [this.bookId],
      title: [null],  
      youtube_url : [null] 
    });

    if(!this.isAddMode){
      console.log(this.audioId)
      this.audioService.getAudioById(this.audioId).
     subscribe((res: any)=>{
      console.log(res);
     
      this.updateAudioForm.patchValue({
        book_id : res.book_id,
        title: res.title,
        youtube_url: res.youtube_url
      })
     })
      
    }
  
    console.log(this.updateAudioForm.value);
    this.getAllBooks();
  }

  get f(){return this.updateAudioForm.controls };

  onSubmit() {
  
    this.submitted = true;

    if( this.updateAudioForm.invalid){
      return;
    };

    this.loading = true;
    if( this.isAddMode){
      this.addAudio();
    }else{
      this.updateAudio();
    }
   
  };

  addAudio(){
    this.audioService.addAudioFile(this.updateAudioForm.value).subscribe((audio) => {
      console.log(audio);
      this.toastr.success('Audio File is added Successfully!');
      // this.router.navigate(['/admin/audio'])
    },
      (error) => {
        this.toastr.error(error?.error);
        console.log('Adding error', error);
      }
    )
  };

  updateAudio(){
     this.audioService.updateAudioById(this.audioId,this.updateAudioForm.value).subscribe(
      (res)=>{
        this.toastr.success("Audio File is Updated Successfully!");
        // this.router.navigate(['/admin/audio']);
      },
      (error)=>{
        this.toastr.success(error?.error)
        console.log('Updating error',error);
      }
     )
  }

  getAllBooks(){
    this.bookService.getAllBooks().subscribe((books)=>this.bookList = books);
  };

  getAudiobyId(){
    this.audioService.getAudioById(this.audioId).subscribe((res)=>console.log(res));
  }
}
