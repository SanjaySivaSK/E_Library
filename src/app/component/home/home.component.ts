import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/service/book.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from 'src/app/service/notification.service';
import { StorageService } from 'src/app/service/storage.service';
import { AppUser } from 'src/app/model/appUser';
import { Book } from 'src/app/model/book';

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
  UserName:String=""

  searchQuery: string = '';

  constructor(
    private bookservice: BookService,
    private toastr: ToastrService,
    private notification: NotificationService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
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
  }
}
