import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileScreenComponent } from './components/profile-screen/profile-screen.component';
import { FacultyScreenComponent } from './components/faculty-screen/faculty-screen.component';
import { HelpScreenComponent } from './components/help-screen/help-screen.component';
import { HomeScreenComponent } from './components/home-screen/home-screen.component';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { RegisterScreenComponent } from './components/register-screen/register-screen.component';
import { SearchScreenComponent } from './components/search-screen/search-screen.component';
import { StudentsScreenComponent } from './components/students-screen/students-screen.component';
import { HttpClientModule } from '@angular/common/http';
import {BrowserModule} from "@angular/platform-browser";

const routes: Routes = [

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeScreenComponent },
  { path: 'login', component: LoginScreenComponent },
  { path: 'register', component: RegisterScreenComponent },
  { path: 'profile', component: ProfileScreenComponent },
  { path: 'search', component: SearchScreenComponent },
  { path: 'faculty/:campusId', component: FacultyScreenComponent },
  { path: 'students/:campusId/:facultyId', component: StudentsScreenComponent },
  { path: 'help', component: HelpScreenComponent },

];

  @NgModule({
    imports: [RouterModule.forRoot(routes),  BrowserModule, HttpClientModule],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}
  export { routes };

