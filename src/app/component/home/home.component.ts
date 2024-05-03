import { Component, OnInit } from '@angular/core';

import { BookService } from 'src/app/service/book.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from 'src/app/service/notification.service';
import { StorageService } from 'src/app/service/storage.service';
import { AppUser } from 'src/app/model/appUser';
import { Router } from '@angular/router';
import { Book } from 'src/app/model/book';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  
  books: Book[] = [];
  filteredBooks: Book[] = [];

  id: number = 0;
  bookName: string = '';
  CategoryName: string = '';
  AuthorName: string = '';
  Description: string = '';
  Stock:number=0;
  UserName:String=""
  Notification:any[]=[]

  searchQuery: string = '';

  constructor(
    private bookservice: BookService,
    private notification: NotificationService,
    private storageService: StorageService,
    private router:Router
  ) {}

  ngOnInit(): void {
    // this.showMessage()
    
        
        
    
    this.bookservice.getbooks().subscribe({
      next: (response) => {
        this.books = response.data;
        this.filteredBooks = this.books; // Initialize filteredBooks with all books initially
      },
      error: (err) => {
        console.error('error', err);
      },
      complete: () => {
        console.log('completed');
      },
    });
    this.UserName=this.storageService.getLoggedInUser().username  

    let userId = this.storageService.getLoggedInUser().id;
    let showMessage = true; // Flag to track whether to show the Swal message
    
    this.notification.GetDeclineBook(userId).subscribe({
      next: (response) => {
        let notifications: any[] = response.data;
    
        for (let notification of notifications) {
          console.log(notification.decline);
    
          if (notification.decline && showMessage) {
            // Handle the case where the book is declined
            Swal.fire({
              title: 'Book Declined',
              text: `The book ${notification.book.book} was declined.`,
              icon: 'error',
              reverseButtons: true,
            }).then((result) => {
              if (result.isConfirmed) {

                this.notification.Accept(notification.id).subscribe({
                  next:(resp)=>{
                        "accept"
                  }
                }) 
                console.log(notification.id)
               


              }
            });
          } 
        }
      },
      error: (error) => {
        console.error('An error occurred:', error);
      },
    });
    
  }

  onSearch() {
    // Filter books based on the search term
    this.filteredBooks = this.books.filter((book) =>
      book.book.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  popup(bookshow: Book) {
    this.id = bookshow.id;
    this.AuthorName = bookshow.author.author;
    this.CategoryName = bookshow.category.category;
    this.bookName = bookshow.book;
    this.Description = bookshow.description;
    this.Stock=bookshow.stock

  }

  requestBook(id: number) {
    let user: AppUser = this.storageService.getLoggedInUser();
    let rBook = {
      userId: user.id,
      bookId: id,
    };

    this.notification.RequestBook(rBook).subscribe({
      next: (Response) => {
        console.log("success");
      },
    });
    console.log(rBook);
  }

  showMessage() {
  
    
   
      Swal.fire({
        title: 'Chief, You got a message!',
        icon: 'info',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
         
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'Your action was cancelled', 'error');
        }
      });
    } }
