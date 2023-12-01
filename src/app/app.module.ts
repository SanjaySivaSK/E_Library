import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';
import { AdminHomeComponent } from './component/admin/home/home.component';
import { LoaderInterceptorService } from './service/interceptor/loaderInterceptor.service';
import { AuthInterceptorService } from './service/interceptor/authInterceptor.service';
import { CategoryComponent } from './component/admin/category/category.component';
import { BookComponent } from './component/admin/book/book.component';
import { AuthorComponent } from './component/admin/author/author.component';
import { IssuebookComponent } from './component/admin/issuebook/issuebook.component';
import { StudentComponent } from './component/admin/student/student.component';
import { UserhistoryComponent } from './component/admin/userhistory/userhistory.component';
import { HomeComponent } from './component/home/home.component';
import { ProfileComponent } from './component/user/profile/profile.component';
import { HistoryComponent } from './component/user/history/history.component';
import { ToastrModule } from 'ngx-toastr';
import { NotifyComponent } from './component/notify/notify.component';
import { ReturnBookComponent } from './component/admin/return-book/return-book.component';
import { DatePipe } from '@angular/common';
// import NotifyComponent from './component/notify/notify.component';
// import { NotificationComponent } from './component/notification/notification.component';


export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminHomeComponent,
    CategoryComponent,
    BookComponent,
    AuthorComponent,
    IssuebookComponent,
    StudentComponent,
    UserhistoryComponent,
    ProfileComponent,
    HistoryComponent,
    NotifyComponent,
    ReturnBookComponent,
   
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LottieModule.forRoot({ player: playerFactory }),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [
    DatePipe, {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
