import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppResponse } from 'src/app/model/appResponse';
import { AppUser } from 'src/app/model/appUser';
import { Userhistory } from 'src/app/model/userhistory';
import { ReturnBookService } from 'src/app/service/return-book.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserhistoryService } from 'src/app/service/userhistory.service';
import { DatePipe } from '@angular/common'; 

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
})
export class HistoryComponent implements OnInit {
  secondInput: any;
  FirstInput: any;
  fineAmount: number | null = null;
 

  constructor(
    private userhistoryservice: UserhistoryService,
    private storageservice: StorageService,
    private returnservice: ReturnBookService, private datePipe: DatePipe 
  ) {}
  userbooks: Userhistory[] = [];

  ngOnInit(): void {
    let user = this.storageservice.getLoggedInUser();
    console.log(user);

    this.userhistoryservice.getUserHistory().subscribe({
      next: (response: AppResponse) => {
        this.userbooks = response.data;
        console.log(response.data);

        //  else {
        //   console.error('Invalid API response format:', response);

        // }
      },
      error: (err) => {
        console.log('An error occurred:', err);
      },
      complete: () => console.log('There are no more actions happening.'),
    });
  }
  returnBook(id: number) {
    console.log(id);
    this.returnservice.returnBook(id).subscribe({
      next: (response) => {},
    });
  }
  onSubmit(categoryForm: NgForm) {
   
   let  date1 = new Date(categoryForm.value.FirstInput);
  console.log(date1);
  let  date2 = new Date(categoryForm.value.FirstInput);
  console.log(date1);
  const differenceInDays = this.calculateDifferenceInDays(date1, date2);
  const finePerDay = 2; // You can adjust this value
  this.fineAmount = differenceInDays > 0 ? differenceInDays * finePerDay : 0;

  }

  calculate(userbook: Userhistory) {
    this.secondInput = this.formatDate(new Date());
    this.FirstInput = userbook.returnDate;
  }

  getCurrentDate(): Date {
    return new Date();
  }
  formatDate(date: Date | string | null): string | null {
    if (!date) {
      return null;
    }

    
    return this.datePipe.transform(date, 'yyyy-MM-dd') || null;
  }
  private calculateDifferenceInDays(date1: Date, date2: Date): number {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diffDays = Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
    return diffDays;
  }
}
