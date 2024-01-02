import { Component, OnInit } from '@angular/core';
import { ReturnBook } from 'src/app/model/return-book';
import { ReturnBookService } from 'src/app/service/return-book.service';

@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html',
})
export class ReturnBookComponent implements OnInit {
  returnBooks: ReturnBook[] = [];
  constructor(private returnservice: ReturnBookService) {}
  ngOnInit(): void {
    this.returnservice.returnedBook().subscribe({
      next: (Response) => {
        console.log(Response);
        this.returnBooks = Response.data;
        console.log(this.returnBooks);
        
      },
    });
  }
}
