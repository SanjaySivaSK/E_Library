import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { AnimationOptions } from 'ngx-lottie';
import { LoaderService } from './service/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  options: AnimationOptions = {
    path: '/assets/loading.json',
    rendererSettings: {
      className: 'lottie-loader',
    },
  };

  isAdmin: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    public loaderService: LoaderService,private router:Router
  ) {}

  ngOnInit(): void {
    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });

    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  logout(): void {
    this.authService.logout();
  }
  category():void{
    this.router.navigate(['/category'],{replaceUrl:true})
    
  }
  book():void{
    this.router.navigate(['/book'],{replaceUrl:true})
    
  }
  author():void{
    this.router.navigate(['/author'],{replaceUrl:true})
    
  }
  issueBook():void{
    this.router.navigate(['/Issuebook'],{replaceUrl:true})
    
  }
  student():void{
     this.router.navigate(['/student']),{replaceUrl:true}
  }
  userHistory():void{
    this.router.navigate(['/Userhistory']),{replaceUrl:true}
  }
  studentBook():void{

  }
  studentHistory():void{
    this.router.navigate(['/history']),{replaceUrl:true}

  }
  studentProfile():void{
    this.router.navigate(['/profile']),{replaceUrl:true}

  }
  notification():void{
this.router.navigate(['/notify']),{replaceUrl:true}
  }
  returnBook(){
    this.router.navigate(['/returnBook']),{replaceUrl:true}

  }
}
