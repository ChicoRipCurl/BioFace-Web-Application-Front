import { Component, OnInit  } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Student } from '../../interfaces/university';
import { DataService } from '../../services/data.service';
import {MatDialog} from "@angular/material/dialog";
import {EditProfileDialogComponent} from "../../interfaces/edit-profile-dialog/edit-profile-dialog.component";


@Component({
  selector: 'app-profile-screen',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './profile-screen.component.html',
  styleUrl: './profile-screen.component.css'
})
export class ProfileScreenComponent implements OnInit {
  currentUser: Student | null = null;
  campusName: string = '';
  facultyName: string = '';

  constructor(
    private router: Router,
    private dataService: DataService,
    private dialog: MatDialog

  ) {}

  ngOnInit() {

    this.dataService.currentUser$.subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.loadLocationNames();
      } else {
        this.router.navigate(['/login']);
      }
    });
  }



  loadLocationNames() {
    if (this.currentUser) {
      this.dataService.getCampusName(this.currentUser.campus_id).subscribe(
        name => this.campusName = name,
        error => console.error('Error loading campus name:', error)
      );

      this.dataService.getFacultyName(this.currentUser.campus_id, this.currentUser.faculty_id).subscribe(
        name => this.facultyName = name,
        error => console.error('Error loading faculty name:', error)
      );
    }
  }

  editProfile() {
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: '500px',
      data: this.currentUser
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.updateStudent(result).subscribe(
          updatedUser => {
            this.currentUser = updatedUser;
            this.loadLocationNames();
          }
        );
      }
    });
  }
}
