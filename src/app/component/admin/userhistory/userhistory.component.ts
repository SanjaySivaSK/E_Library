import { Component, OnInit } from '@angular/core';
import { Issuebook } from 'src/app/model/issuebook';
import { AppResponse } from 'src/app/model/appResponse';
import { IssuebookService } from 'src/app/service/issuebook.service';
import { UserhistoryService } from 'src/app/service/userhistory.service';
import { Userhistory } from 'src/app/model/userhistory';

@Component({
  selector: 'app-userhistory',
  templateUrl: './userhistory.component.html',

})
export class UserhistoryComponent implements OnInit {
  constructor(private userhistoryservice:UserhistoryService){}
  BookName:string=""
  StudentName:string=""
issuebooks:Userhistory[]=[]

ngOnInit(): void {
  this.userhistoryservice.getUsersHistory().subscribe({
    next: (response: AppResponse) => {
    console.log("jiiiii")
      if (response && response.data) {
        this.issuebooks = response.data;
        console.log(this.issuebooks)
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

}
