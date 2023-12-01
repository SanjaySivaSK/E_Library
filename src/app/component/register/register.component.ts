import { Component } from '@angular/core';
import { NgForm, NumberValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { ToastrService } from 'ngx-toastr';
import { Register } from 'src/app/model/register';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  UserName: string = '';
  phoneNumber: number = 0;
  AddressHome: string = '';
  Profession: string = '';
  Password: string = '';
  id: number = 0;
  person: string = '';
  Register: Register[] = [];

  constructor(
    private router: Router,
    private authservice: AuthService,
    private toastr: ToastrService
  ) {}

  options: AnimationOptions = {
    path: '/assets/auth.json',
  };

  onSubmit(registerForm: NgForm): void {
    const userdetails: Register = {
      id: 0,
      name: this.person,
      username: this.UserName,
      phoneNumber: this.phoneNumber,
      address: this.AddressHome,
      profession: this.Profession,
      password: this.Password,

      // Handle invalid form
    };
    console.log(userdetails);

    this.authservice.register(userdetails).subscribe({
      next: (response) => {
        this.Register.push(response.data);
       registerForm.reset()
        console.log(this.Register);
        this.toastr.success("successfully Register")
        

        this.router.navigate(['/login'], { replaceUrl: true });
      },
      error: (error) => {
        this.toastr.error('Check Your Credentials and Try again' + error);
      },
    });

    // Form data is valid, perform registration logic
    console.log('Registration data:', registerForm.value);

    // Redirect to login page
  }
}
