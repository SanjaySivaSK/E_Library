import { Component, OnInit } from '@angular/core';
import { Register } from 'src/app/model/register';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  Name: string = '';
  Username: string = '';
  PhoneNumber: string = '';
  Profession: string = '';
  Address: string = '';

  constructor(private profileservice: ProfileService) {}

  ngOnInit(): void {
    this.profileservice.getUserdetail().subscribe({
      next: (response) => {
        console.log(response);

        if (response && response.data) {
          this.Name = response.data.name || '';
          this.Username = response.data.username || '';
          this.PhoneNumber = response.data.phoneNumber || '';
          this.Profession = response.data.profession || '';
          this.Address = response.data.address || '';
        } else {
          console.error('Invalid or missing user details data.');
        }
      },
      error: (error) => {
        console.error('Error fetching user details:', error);
      },
    });
  }
}
