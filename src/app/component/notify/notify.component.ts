import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppResponse } from 'src/app/model/appResponse';
import { Book } from 'src/app/model/book';
import { NotificationService } from 'src/app/service/notification.service';
import { UserhistoryService } from 'src/app/service/userhistory.service';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
})
export class NotifyComponent implements OnInit {



  BookId: number = 0;
  UserId: number = 0;

  IssueDate: string = '';
  ReturnDate: string = '';
  id:number=0;
  notifys: any[] = [];
  renewalBooks: any[] = [];

  Sno: number = 1;
  currentDate = new Date();
  year = this.currentDate.getFullYear();
  month = String(this.currentDate.getMonth() + 1).padStart(2, '0');
  day = String(this.currentDate.getDate()).padStart(2, '0');
  issuedDate = ""
  returnDate = `${this.currentDate.getDate() + 2}-${this.month}-${this.year}`;

  constructor(private notification: NotificationService,private userhistory:UserhistoryService) {}
  ngOnInit(): void {
    this.notification.getNotification().subscribe({
      next: (resp) => {
        this.notifys = resp.data;
        console.log(this.notifys);
      },
    });
    this.notification.renewalBook().subscribe({
      next: (Response: AppResponse) => {
        this.renewalBooks = Response.data;
        console.log(this.renewalBooks);
      },
    });
  }
  clear(id: number) {
    this.notification.clear(id).subscribe({
      next: (response) => {
        this.ngOnInit();
        console.log(response);
      },
    });
  }

  decline(id:number) {
    this.notification.DeclineBook(id).subscribe({
      next: (response) => {
        this.ngOnInit();
        console.log(response);
      },
    });


  }


  remove(id: number) {
    console.log(id);
    this.notification.remove(id).subscribe({});
  }
  popup(renewalBook: any) {
    
    this.BookId = renewalBook.book.id;
    this.UserId = renewalBook.appUser.id;
    this.id=renewalBook.id
    this.IssueDate = renewalBook.issuedDate
    

    this.ReturnDate = this.returnDate;

  }
  onSubmit(renewal: NgForm) {
   let renewals=renewal.value;
   console.log(renewals);
   
   this.userhistory.adminRenewalBook(renewals).subscribe({
    next:(Response:AppResponse)=>{

    }


   })
   
   
   

}}
