import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeScreenComponent } from "./components/home-screen/home-screen.component";
import { HeaderComponent } from './components/header/header.component';
import { ProfileScreenComponent } from './components/profile-screen/profile-screen.component';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import {SearchScreenComponent} from "./components/search-screen/search-screen.component";
import { HttpClientModule } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import {CommonModule} from "@angular/common";
import {RegisterScreenComponent} from "./components/register-screen/register-screen.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RegisterScreenComponent, CommonModule, HttpClientModule, RouterOutlet, HeaderComponent, SearchScreenComponent, HomeScreenComponent, LoginScreenComponent, ProfileScreenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'bioface-frontend';

  showHeader = true;

  constructor(private router: Router) {}

  ngOnInit(): void {

    this.router.events.subscribe(() => {

      this.showHeader = !(this.router.url === '/login' || this.router.url === '/register');
    });
  }
}
