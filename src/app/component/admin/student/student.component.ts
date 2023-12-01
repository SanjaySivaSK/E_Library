import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/service/student.service';
import { AppResponse } from 'src/app/model/appResponse';
import { RegisteredUser } from 'src/app/model/registered-user';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',

})
export class StudentComponent implements OnInit {
  users:RegisteredUser[]=[]
  constructor(private studentservice:StudentService){}
  ngOnInit(): void {
    this.studentservice.getUsers().subscribe({
      next: (response: AppResponse) => {
      
        if (response && response.data) {
          this.users = response.data;
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
