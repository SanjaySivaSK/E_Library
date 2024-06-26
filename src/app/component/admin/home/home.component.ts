import { Component } from '@angular/core';
import { AppResponse } from 'src/app/model/appResponse';
import { AppUser } from 'src/app/model/appUser';
import { Author } from 'src/app/model/author';
import { Book } from 'src/app/model/book';
import { Category } from 'src/app/model/category';
import { Issuebook } from 'src/app/model/issuebook';
import { AuthorService } from 'src/app/service/author.service';
import { BookService } from 'src/app/service/book.service';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';
import { IssuebookService } from 'src/app/service/issuebook.service';
import { StudentService } from 'src/app/service/student.service';
import { Router } from '@angular/router';
import { UserhistoryService } from 'src/app/service/userhistory.service';

import { NotificationService } from 'src/app/service/notification.service';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class AdminHomeComponent {
  
  constructor(
    private bookservice: BookService,
    private categoryservice: CategoryService,
    private authorservice: AuthorService,
    private studentservice: StudentService,
    private issuebookservice: IssuebookService,
    private router: Router,
    private notifys: NotificationService
  ) {}

  books: Book[] = [];
  categories: Category[] = [];
  author: Author[] = [];
  users: AppUser[] = [];
  issuebooks: Issuebook[] = [];
  NotifyCount: number = 0;
  notify: any[] = [];
  bookCount: number = 0;
  categoryCount: number = 0;
  authorCount: number = 0;
  studentCount: number = 0;
  issuedCount: number = 0;
  formattedDate: string = "";

  ngOnInit(): void {
    
   
    
    this.notifys.getNotification().subscribe({
      next: (response: AppResponse) => {
        if (response && response.data) {
          this.notify = response.data;
          console.log(this.notify);
          this.NotifyCount = this.notify.length;
          console.log(this.NotifyCount);
          this.showMessage(this.NotifyCount)
        } else {
          console.error('Invalid API response format:', response);
        }
      },
      error: (err) => {
        console.log('An error occurred:', err);
      },
      complete: () => console.log('There are no more actions happening.'),
    });
    
    this.categoryservice.getCategories().subscribe({
      next: (response: AppResponse) => {
        if (response && response.data) {
          this.categories = response.data;
          console.log(this.categories);
          this.categoryCount = this.categories.length;
        } else {
          console.error('Invalid API response format:', response);
        }
      },
      error: (err) => {
        console.log('An error occurred:', err);
      },
      complete: () => console.log('There are no more actions happening.'),
    });

    this.authorservice.getAuthors().subscribe({
      next: (response: AppResponse) => {
        if (response && response.data) {
          this.author = response.data;
          console.log(this.categories);
          this.authorCount = this.author.length;
        } else {
          console.error('Invalid API response format:', response);
        }
      },
      error: (err) => {
        console.log('An error occurred:', err);
      },
      complete: () => console.log('There are no more actions happening.'),
    });

    this.bookservice.getbooks().subscribe({
      next: (response: AppResponse) => {
        if (response && response.data) {
          this.books = response.data;
          console.log(this.books);
          this.bookCount = this.books.length;
        } else {
          console.error('Invalid API response format:', response);
        }
      },
      error: (err) => {
        console.log('An error occurred:', err);
      },
      complete: () => console.log('There are no more actions happening.'),
    });

    this.studentservice.getUsers().subscribe({
      next: (response: AppResponse) => {
        if (response && response.data) {
          this.users = response.data;
          this.studentCount = this.users.length;
        } else {
          console.error('Invalid API response format:', response);
        }
      },
      error: (err) => {
        console.log('An error occurred:', err);
      },
      complete: () => console.log('There are no more actions happening.'),
    });

    this.issuebookservice.getIssuebook().subscribe({
      next: (response: AppResponse) => {
        if (response && response.data) {
          this.issuebooks = response.data;
          console.log(response.data);
          this.issuedCount = this.issuebooks.length;
        } else {
          console.error('Invalid API response format:', response);
        }
      },
      error: (err) => {
        console.log('An error occurred:', err);
      },
      complete: () => console.log('There are no more actions happening.'),
    });

    let today = new Date();
    this.formattedDate = today.toLocaleDateString('en-GB');

  }

  // showAlertWithDelay() {
  //   const alertMessage = 'This is a window alert message!';
  //   setTimeout(() => {
  //     this.showMessage();
  //   }, 2000);
  // }
  showMessage(count:number) {
    console.log(count);
    
    if (count > 0) {
      Swal.fire({
        title: 'Chief, You got a message!',
        icon: 'info',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/notify']);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'Your action was cancelled', 'error');
        }
      });
    } }

  
  }

