import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {
  addBookForm: any = FormGroup;
  dbBookForm: any ;
  dbCoverImageUrl: any = null;
  submitted = false;
  selectedFile?: File;
  bookId: any;
  isAddMode! : boolean;

  selectedImg: any;
  imgSrc: any = './assets/placeholder.png';
  book: any;


  constructor(private bookService: BookService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.params['book-id'];
    this.isAddMode = !this.bookId;

    this.addBookForm = this.formBuilder.group({
      title: [null],
      author: [null],
      description: [null],
      cover_image_url: [null]
    });

    if( !this.isAddMode ){
      this.bookService.getBookById(this.bookId).subscribe((res: any)=>{
        this.book = res;
        this.addBookForm.patchValue({
          title: this.book.title,
          author: this.book.author,
          description: this.book.description,
          cover_image_url: null
        })
        this.imgSrc = this.book.cover_image_url
      });
      
     
    }
  };

  get f() { return this.addBookForm.controls };

  onSubmit() {
    this.submitted = true;
    if (this.addBookForm.invalid) {
      return;
    };
    console.log(this.addBookForm.value);

    

    const dbBookForm = {
      title: this.addBookForm.value.title,
      author: this.addBookForm.value.author,
      description: this.addBookForm.value.description,
      cover_image_url:null
    }
    console.log(this.dbBookForm)

     try{
      console.log( this.selectedImg)
      this.bookService.uploadImage(this.selectedImg,dbBookForm,this.isAddMode,this.bookId)
      alert('Book is uploaded successfully')
     } catch(error){
      alert(error);
     }

     
   

   

   
  };

  addBook(credential: any){
    this.bookService.addBook(credential).subscribe((book: any)=>{
      console.log(book);
      alert('Book is added Successfully!')
    },
  (error)=>{
    alert(error?.error);
    console.log('Adding error',error);
  })
  };

  updateBook(credential: any){
    this.bookService.updateBook(this.bookId,credential).subscribe((res: any)=>{
      alert('Book is updated Successfully!');
      console.log(res)
    },
    (error)=>{
      console.log('Updating error',error);
    }
  )
  }

  showPreview($event: any) {
    // this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e)=>{
      this.imgSrc = e.target?.result
    }
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }

}


