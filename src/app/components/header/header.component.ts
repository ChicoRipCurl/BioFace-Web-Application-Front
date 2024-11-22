import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {Router, RouterLink} from "@angular/router";
import { DataService } from '../../services/data.service';
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, MatToolbarModule, MatButtonModule, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private dataService: DataService,
  ) {}

  logout(): void {
    this.dataService.logout();
    this.router.navigate(['/login']);
  }

}
