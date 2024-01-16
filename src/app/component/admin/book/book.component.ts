import { Component, OnInit } from '@angular/core';
import { AppResponse } from 'src/app/model/appResponse';
import { BookService } from 'src/app/service/book.service';
import { Book } from 'src/app/model/book';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';
import { AuthorService } from 'src/app/service/author.service';
import { Author } from 'src/app/model/author';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
})
export class BookComponent implements OnInit {
close(form:NgForm) {
  form.reset()

}
  editId = 0;
  books: Book[] = [];
  categories: Category[] = [];
  authors: Author[] = []; // Corrected the variable name from 'author' to 'authors'
  id: number = 0;
  BookName: string = '';
  category: number = 1;
  Author: number = 1;
  description: string = '';
  file: any = null; // Changed the type to 'any'
 Sno:number=1;
  constructor(
    private bookservice: BookService,
    private categoryservice: CategoryService,
    private authorservice: AuthorService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
  

    this.categoryservice.getCategories().subscribe({
      next: (response: AppResponse) => {
        if (response && response.data) {
          this.categories = response.data;
          console.log(this.categories);
        } else {
          console.error('Invalid API response format:', response);
        }
      },
      error: (err) => {
        console.log('An error occurred:', err);
      },
    });
    this.authorservice.getAuthors().subscribe({
      next: (response: AppResponse) => {
        if (response && response.data) {
          this.authors = response.data; // Corrected the variable name from 'author' to 'authors'
          console.log(this.authors);
        } else {
          console.error('Invalid API response format:', response);
        }
      },
      error: (err) => {
        console.log('An error occurred:', err);
      },
    });

    this.bookservice.getbooks().subscribe({
      next: (response: AppResponse) => {
        if (response && response.data) {
          this.books = response.data;
      
          console.log(this.books);
        } else {
          console.error('Invalid API response format:', response);
        }
      },
      error: (err) => {
        console.log('An error occurred:', err);
      },
    });
  }

  onSubmit(BookForm: NgForm): void {
    console.log(BookForm.value);

    const formData = new FormData();
    formData.append('book', BookForm.value.book);
    formData.append('categoryId', BookForm.value.categoryId);
    formData.append('authorId', BookForm.value.authorId);
    formData.append('description', BookForm.value.description);

    if (this.editId === 0) {
      formData.append('photo', this.file);
      this.bookservice.addBooks(formData).subscribe({
        next: (response) => {
          this.books = response.data;
          BookForm.reset();
          this.toastr.success('Book added successfully');
        },
        error: (err) => {
          console.error('An error occurred while adding the book', err);
        },
        complete: () => {
          console.log('Book addition complete.');
        },
      });
    } else {
      formData.append('id', this.id.toString());
      this.bookservice.updateBooks(formData).subscribe({
        next: (response) => {
          this.books = response.data;
          BookForm.reset();
          this.editId = 0;
          this.toastr.success('Book updated successfully');
        },
        error: (err) => {
          console.error('An error occurred while updating the book', err);
        },
        complete: () => {
          console.log('Book update complete.');
        },
      });
    }
  }

  editBook(book: Book) {
    this.id = book.id;
    this.BookName = book.book;
    this.category = book.category.id;
    this.Author = book.author.id;
    this.description = book.description;
    this.editId = 1;
    console.log(book)
  }

  deleteBook(id: number): void {
    console.log(id);
    this.bookservice.deleteBooks(id).subscribe({
      next: (response) => {
        this.books = response.data;
        this.ngOnInit()
      },
      error: (err) => {
        console.error('An error occurred while deleting the book', err);
      },
      complete: () => {
        console.log('Book is deleted.');
      },
    });
  }

  onFileChange(event: any) {
    const fileInput = event.target;
    if (fileInput && fileInput.files.length > 0) {
      this.file = fileInput.files[0];
      // console.log('Selected file', this.file);
    }
  }
}
