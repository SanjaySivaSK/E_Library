import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppResponse } from 'src/app/model/appResponse';
import { Author } from 'src/app/model/author';
import { Category } from 'src/app/model/category';
import { AuthorService } from 'src/app/service/author.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
})
export class AuthorComponent implements OnInit {

  constructor(private authorservice: AuthorService) {}
  author: string = '';
  authors: Author[] = [];
  editId = 0;
  id = 0;
  Sno:number=1

  ngOnInit(): void {
    this.authorservice.getAuthors().subscribe({
      next: (response: AppResponse) => {
        if (response && response.data) {
          this.authors = response.data;
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

  onSubmit(authorform: NgForm): void {
    const addAuthor: Author = {
      id: 0,
      author: this.author,
    };

    console.log('Submitting author:', addAuthor);

    if (this.editId === 0) {
      this.authorservice.addAuthor(addAuthor).subscribe({
        next: (response: any) => {
          this.authors = response.data;
          authorform.reset();
          console.log('Author added successfully:', response);
        },
        error: (err) => {
          console.error('An error occurred while adding the author:', err);
        },
        complete: () => console.log('Author addition complete.'),
      });
    } else {
      this.authorservice
        .updateAuthor({ id: this.id, author: this.author })
        .subscribe({
          next: (response: any) => {
            this.authors = response.data;
            authorform.reset();
            this.editId = 0;

            console.log('Author added successfully:', response);
          },
          error: (err) => {
            console.error('An error o ccurred while adding the Author:', err);
          },
        });
    }
  }
  edit(author: Author) {
    (this.id = author.id), (this.author = author.author);
    this.editId = 1;
  }
  delete(id: number): void {
    this.authorservice.deleteAuthor(id).subscribe({
      next: (response: any) => {
        this.authors = response.data;

        console.log('Author added successfully:', response);
        this.editId = 0;
      },
      error: (err) => {
        console.error('An error occurred while adding the Author:', err);
      },
    });
  }
  close() {
    this.editId=0
    this.id=0
    this.author=" "
   
    }
}
