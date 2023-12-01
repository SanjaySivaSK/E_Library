import { Component, OnInit } from '@angular/core';
import { AppResponse } from 'src/app/model/appResponse';
import { BookService } from 'src/app/service/book.service';
import { Book } from 'src/app/model/book';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';
import { AuthorService } from 'src/app/service/author.service';
import { Author } from 'src/app/model/author';
import { NgForm } from '@angular/forms';
import { BookItem } from 'src/app/model/book-item';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
})
export class BookComponent implements OnInit {
  editId = 0;
  books: Book[] = [];
  categories: Category[] = [];
  author: Author[] = [];
  id: number = 0;
  BookName: string = '';
  category: number = 1;
  Author: number = 1;
  description: string = '';
  file = '';

  constructor(
    private bookservice: BookService,
    private categoryservice: CategoryService,
    private authorservice: AuthorService,private toastr :ToastrService
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
      complete: () => console.log('There are no more actions happening.'),
    });
    this.authorservice.getAuthors().subscribe({
      next: (response: AppResponse) => {
        if (response && response.data) {
          this.author = response.data;
          console.log(this.categories);
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
        } else {
          console.error('Invalid API response format:', response);
        }
      },
      error: (err) => {
        console.log('An error occurred:', err);
      },
      complete: () => console.log('There are no more actions happening.'),
    });
  }
  onSubmit(BookForm: NgForm): void {
  console.log(BookForm.value)

    const formdata =new FormData()
    formdata.append('photo',this.file);
    formdata.append('book',BookForm.value.book);
    formdata.append('categoryId',BookForm.value.categoryId)
    formdata.append('authorId',BookForm.value.authorId)
    formdata.append('description',BookForm.value.description)

console.log(formdata)
   
      this.bookservice.addBooks(formdata).subscribe({
        next: (response) => {
          (this.books = response.data), BookForm.reset();
          this.toastr.success("Book added Sucessfully")
        },
        error: (err) => {
          console.error('An error occurred while adding the book', err);
        },
        complete: () => {
          console.log('Author addition complete.');
        },
      });
  //   } else {
      
  //     this.bookservice
  //       .updateBooks({
  //         id: this.id,
  //         book: this.BookName,
  //         categoryId: this.category,
  //         authorId: this.Author,
  //         description: this.description,
  //       })
  //       .subscribe({
  //         next: (response) => {
  //           (this.books = response.data), BookForm.reset();
  //           this.editId = 0;
  //         },
  //         error: (err) => {
  //           console.error('An error occurred while adding the book', err);
  //         },
  //         complete: () => {
  //           console.log('BooK addition complete.');
  //         },
  //       });
  //   }
  // }
  // editBook(book: Book) {
  //   (this.id = book.id),
  //     (this.BookName = book.book),
  //     (this.category = book.category.id);
  //   this.Author = book.author.id;
  //   this.description = book.description;
  //   this.editId = 1;
  // }}
    }
  
  deleteBook(id: number): void {
    console.log(id);
    this.bookservice.deleteBooks(id).subscribe({
      next: (response) => {
        this.books = response.data;
      },
      error: (err) => {
        console.error('an error occured while deleting the book', err);
      },
      complete: () => {
        console.log('book is delete');
      },
    });
  }
  onFileChange(event: any) {
    const fileInput = event.target;
    if (fileInput && fileInput.files.length > 0) {
      this.file = fileInput.files[0];

      // console.log('Selected file',this.file);
    }
  }
}
