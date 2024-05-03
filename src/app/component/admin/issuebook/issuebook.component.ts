  import { Component, OnInit } from '@angular/core';
  import { Issuebook } from 'src/app/model/issuebook';
  import { AppResponse } from 'src/app/model/appResponse';
  import { IssuebookService } from 'src/app/service/issuebook.service';
  import { NgForm } from '@angular/forms';
import { lightFormat } from 'date-fns';

  @Component({
    selector: 'app-issuebook',
    templateUrl: './issuebook.component.html',
  
  })
  export class IssuebookComponent  implements OnInit{
    error: any;
    constructor(private issuebookservice:IssuebookService){}
    BookId:number=0
    StudentId:number=0
  
 
    Sno:number=1
     currentDate = new Date();
      
     
     
     year = this.currentDate.getFullYear();
     month = String(this.currentDate.getMonth() + 1).padStart(2, '0');
     day = String(this.currentDate.getDate()).padStart(2, '0');
    
     issuedDate = `${this.day}-${this.month}-${this.year}`;
     ReturnDate= `${(this.currentDate.getDate()+2)}-${this.month}-${this.year}`; 

    
  issuebooks:Issuebook[]=[]
  ngOnInit(): void {
    console.log(this.currentDate);

    
    this.issuebookservice.getIssuebook().subscribe({
      next: (response: AppResponse) => {
      
        if (response && response.data) {
          this.issuebooks = response.data;
          console.log(response.data);
          
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

onSubmit(issueBookForm: any) {
  let issueBook =issueBookForm.value;
  console.log(issueBook)
  this.issuebookservice.issueBook(issueBook).subscribe({
    next:(resp:AppResponse)=>{
      this.ngOnInit()
         console.log(resp);
         
    },
    error: (error: any) => {
      // Check if there is a nested error message
      const errorMessage = error?.error?.message || 'Unknown error';

      // Log the error message
      console.error('Error:', errorMessage);
    }
  })
}

}
