import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  submitted: boolean= false;
  imgSrc: any = './assets/placeholder.png';
  selectedImg: any;

  bookForm :any = FormGroup;

  book: any;

  isAddMode! : boolean;

  bookId: string = '';


  constructor(private bookService: BookService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { 
    this.bookId = this.route.snapshot.params['book-id'];

    this.isAddMode = !this.bookId;

    if( this.isAddMode){
   
      this.bookForm = formBuilder.group({
        title: [null],
        author: [null],
        description: [null],
        cover_image_url: [null]
      })
    }else{
      
      this.bookService.getBookById(this.bookId).subscribe((res=>{
        this.book = res;
        console.log(this.book);

        this.bookForm.patchValue({
          title: this.book.title ,
          author: this.book.author,
          description: this.book.description,
          cover_image_url: null,
        });
        
        this.imgSrc =  this.book.cover_image_url;
      }))

      
    }
  }

  ngOnInit(): void {

   
  }

  get f(){ return this.bookForm.controls};

  showPreview($event: any){
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result
    }
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  };

  onSubmit(){
    this.submitted = true;
    console.log( this.bookForm.value);

    const bookData = {
      title: this.bookForm.value.title,
      author: this.bookForm.value.author,
      description: this.bookForm.value.description,
      cover_image_url: null,
    };
    console.log( bookData);
    this.bookService.uploadImage( this.selectedImg,bookData,this.isAddMode,this.bookId);
    alert ( 'Book is uploaded successfully');
    
  }


}


