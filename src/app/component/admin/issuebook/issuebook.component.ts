  import { Component, OnInit } from '@angular/core';
  import { Issuebook } from 'src/app/model/issuebook';
  import { AppResponse } from 'src/app/model/appResponse';
  import { IssuebookService } from 'src/app/service/issuebook.service';
  import { NgForm } from '@angular/forms';

  @Component({
    selector: 'app-issuebook',
    templateUrl: './issuebook.component.html',
  
  })
  export class IssuebookComponent  implements OnInit{
    constructor(private issuebookservice:IssuebookService){}
    BookId:number=0
    StudentId:number=0
    IssueDate:string=""
    ReturnDate:string=""

    
  issuebooks:Issuebook[]=[]
  ngOnInit(): void {
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
    next:(resp)=>{
      this.ngOnInit()
    }
  
  }) 

}

  }
