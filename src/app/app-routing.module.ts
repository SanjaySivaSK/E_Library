import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';

import { AdminHomeComponent } from './component/admin/home/home.component';
import { authGuard } from './guard/auth.guard';
import { CategoryComponent } from './component/admin/category/category.component';
import { BookComponent } from './component/admin/book/book.component';
import { AuthorComponent } from './component/admin/author/author.component';
import { StudentComponent } from './component/admin/student/student.component';
import { IssuebookComponent } from './component/admin/issuebook/issuebook.component';
import { HistoryComponent } from './component/user/history/history.component';
import { HomeComponent } from './component/home/home.component';
import { UserhistoryComponent } from './component/admin/userhistory/userhistory.component';
import { ProfileComponent } from './component/user/profile/profile.component';
import { NotifyComponent } from './component/notify/notify.component';
import { ReturnBookComponent } from './component/admin/return-book/return-book.component';
// import NotifyComponent from './component/notify/notify.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminHomeComponent, canActivate: [authGuard] },
  { path: 'category', component: CategoryComponent },
  { path: 'book', component: BookComponent },
  { path: 'author', component: AuthorComponent },
  { path: 'student', component: StudentComponent },
  { path: 'Issuebook', component: IssuebookComponent },
  {
    path: 'history',
    component: HistoryComponent,
  },
  {
    path: 'Userhistory',
    component: UserhistoryComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'notify',
    component: NotifyComponent,
  },{
    path:'returnBook',component:ReturnBookComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
