import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppResponse } from 'src/app/model/appResponse';
import { Userhistory } from 'src/app/model/userhistory';
import { ReturnBookService } from 'src/app/service/return-book.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserhistoryService } from 'src/app/service/userhistory.service';
import { DatePipe } from '@angular/common';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
})
export class HistoryComponent implements OnInit {
  optionss: AnimationOptions = {
    path: '/assets/NoData.json',
  };
  
  
  fineAmount: number | null = null;
  id: number = 0;
  Sno:number=1;

  constructor(
    private userhistoryservice: UserhistoryService,
    private storageservice: StorageService,
    private returnservice: ReturnBookService,
    private datePipe: DatePipe
  ) {}

  userbooks: Userhistory[] = [];


  ngOnInit(): void {
    this.loadUserHistory();
    console.log(this.userbooks.length);
    
  }

  loadUserHistory(): void {
    let user = this.storageservice.getLoggedInUser();
    console.log(user);

    this.userhistoryservice.getUserHistory().subscribe({
      next: (response: AppResponse) => {
        this.userbooks = response.data;
        console.log(response.data);
      },
      error: (err) => {
        console.log('An error occurred:', err);
      },
      complete: () => console.log('There are no more actions happening.'),
    });
  }

  returnBook(ids: number): void {
    console.log(ids);
      var amt=this.fineAmount;

 
      this.returnservice.returnBook(ids,amt).subscribe({
        next: (response) => {},
      });
    

   
  }

  // onSubmit(categoryForm: NgForm): void {
  //   let date1 = new Date(categoryForm.value.FirstInput);
  //   console.log(date1);
  //   let date2 = new Date(categoryForm.value.FirstInput);
  //   console.log(date2);
  //   const differenceInDays = this.calculateDifferenceInDays(date1, date2);
  //   const finePerDay = 2; // You can adjust this value
  //   this.fineAmount = differenceInDays > 0 ? differenceInDays * finePerDay : 0;
  // }

  // getCurrentDate(): Date {
  //   return new Date();
  // }


  private calculateDifferenceInDays(returndate: Date, currentdate: Date): number {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diffDays = Math.round(Math.abs((returndate.getTime() - currentdate.getTime()) / oneDay));
    return diffDays;
  }

  popup(userbook: Userhistory): void {
    this.id = userbook.id;
    let returndate = userbook.returnDate;
    let currentDate: Date = new Date();
    console.log(returndate);
    console.log(currentDate);

    const returnDate: Date = new Date(returndate);

    const differenceInDays = this.calculateDifferenceInDays(returnDate, currentDate);
    const finePerDay = 2; // You can adjust this value
    this.fineAmount = differenceInDays > 0 ? differenceInDays * finePerDay : 0;
  }

}
