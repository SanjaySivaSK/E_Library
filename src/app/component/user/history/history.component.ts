  import { Component, OnInit } from '@angular/core';
  import { NgForm } from '@angular/forms';
  import { AppResponse } from 'src/app/model/appResponse';
  import { Userhistory } from 'src/app/model/userhistory';
  import { ReturnBookService } from 'src/app/service/return-book.service';
  import { StorageService } from 'src/app/service/storage.service';
  import { UserhistoryService } from 'src/app/service/userhistory.service';
  import { DatePipe } from '@angular/common';

  import { AnimationOptions } from 'ngx-lottie';
  import { NotificationService } from 'src/app/service/notification.service';

  @Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
  })
  export class HistoryComponent implements OnInit {

    optionss: AnimationOptions = {
      path: '/assets/NoData.json',
    };
    
    
    fineAmount: number  = 0;
    id: number = 0;
    Sno:number=1;
    bookId:number|null|undefined=0;

    constructor(
      private userhistoryservice: UserhistoryService,
      private storageservice: StorageService,
      private notify:NotificationService,
      private returnservice:ReturnBookService 
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
        // for (let book of userbooks){
        //   console.log(book.id);
          
        // }

      var bookId=this.bookId
        

  
          this.returnservice.returnBook(ids,amt,bookId).subscribe({
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
      console.log(diffDays);
      
      return diffDays;
    }

    popup(userbook: Userhistory): void {
      this.id = userbook.id;
      this.bookId = userbook.bookId;
      let returndate = userbook.returnDate;
      let currentDate: Date = new Date();
  
      const [day, month, year] = returndate.split('-').map(Number);
      const parsedDate = new Date(year, month - 1, day);
      console.log(parsedDate);
      console.log(currentDate);
      
      
      if (parsedDate < currentDate) {
        const timeDifference =parsedDate.getTime()- currentDate.getTime() ;
        console.log(timeDifference);
        const differenceInDays = Math.abs(Math.ceil(timeDifference / (1000 * 3600 * 24)));
        console.log(differenceInDays);
        
        const finePerDay = 2; // You can adjust this value
        this.fineAmount = differenceInDays * finePerDay;
      } else {
        this.fineAmount = 0;
      }
    }
    RenewelBook(id: number) {

      this.userhistoryservice.renewalBook(id).subscribe({
      
        
      })
    
      

      }
  }
