import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from 'src/app/service/home.service';
import { BookService } from 'src/app/service/book.service';
import { CategoryService } from 'src/app/service/category.service';
import { AuthorService } from 'src/app/service/author.service';
import { Book } from 'src/app/model/book';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from 'src/app/service/notification.service';
import { RequestBook } from 'src/app/model/request-book';
import { StorageService } from 'src/app/service/storage.service';
import { AppUser } from 'src/app/model/appUser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
onSearch() {
throw new Error('Method not implemented.');
}
  
  requestBooks:any
  books: Book[] = [];
  number:number=0;

 
  constructor(
    private bookservice: BookService,
    private categoryservice: CategoryService,
    private authorservice: AuthorService,private toastr: ToastrService,
    private notification:NotificationService,
    private storageService:StorageService)
   {}
  id: number = 0;
  bookName: string = '';
  CategoryName: string = '';
  AuthorName:string="";
  Description:string=""
  ngOnInit(): void {
    this.bookservice.getbooks().subscribe({
      next: (response) => {
        this.books = response.data;
      },
      error: (err) => {
        console.error('error', err);
      },
      complete: () => {
        console.log('completed');
      },
    });
  }
  popup(bookshow: Book) {
    this.id=bookshow.id,
    this.AuthorName=bookshow.author.author,
    this.CategoryName=bookshow.category.category
    this.bookName=bookshow.book
    this.Description=bookshow.description
  }
  // clear(id: number) {
  //   console.log(id);
  //   this.notification.clear(id).subscribe({
  //     next: () => {
      
  //     },
  //     error: (error) => {
  //       console.error('Error:', error);
       
  //     },
  //   });



  requestBook(id:number){
    let user:AppUser=this.storageService.getLoggedInUser();
    console.log(user.id)
    console.log(id);
    let rBook:RequestBook={
      userId:user.id,
      bookId:id

    }
    console.log(rBook);
    

    this.notification.RequestBook(rBook).subscribe({
      next:(Response)=>{
        console.log("sucesss");
        
      }
    })
  }
  
  
  }
  

 

