import {Component, OnInit,signal} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {Router} from "@angular/router";
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {DataService} from "../../services/data.service";
import {HttpClientModule, HttpErrorResponse} from '@angular/common/http';

import { University, Campus, Faculty, Student } from "../../interfaces/university";
import {CommonModule} from "@angular/common";
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-register-screen',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatCheckboxModule,
    CommonModule, HttpClientModule,
    MatSnackBarModule, MatProgressSpinner,
  ],
  templateUrl: './register-screen.component.html',
  styleUrl: './register-screen.component.css'
})
export class RegisterScreenComponent implements OnInit {
  hide = true;
  isLoading = false;
  universities: University[] = [];
  campuses: Campus[] = [];
  faculties: Faculty[] = [];

  selectedUniversityId: number | undefined;
  selectedCampusId: number | undefined;
  selectedFacultyId: number | undefined;
  selectedRole: 'student' | 'administrator' = 'student';

  student: Student = {
    id: 0,
    name: '',
    lastname: '',
    email: '',
    password: '',
    institution_name: '',
    profile_picture: 'https://i.imgur.com/hCMFf6B.png',
    role: this.selectedRole,
    campus_id: 0,
    faculty_id: 0,
  };

  constructor(private dataService: DataService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadUniversities();
  }

  loadUniversities(): void {
    this.dataService.getUniversities().subscribe({
      next: (universities) => {
        this.universities = universities;
      },
      error: (error) => {
        console.error('Error loading universities:', error);
        this.snackBar.open('Error al cargar universidades', 'Cerrar', { duration: 3000 });
      }
    });
  }

  onUniversityChange(universityId: number): void {
    this.selectedUniversityId = universityId;
    const selectedUniversity = this.universities.find(u => u.id === universityId);
    if (selectedUniversity) {
      this.campuses = selectedUniversity.campuses;
    }
    this.selectedCampusId = undefined;
    this.faculties = [];
  }

  onCampusChange(campusId: number): void {
    this.selectedCampusId = campusId;
    const selectedCampus = this.campuses.find(c => c.id === campusId);
    if (selectedCampus) {
      this.faculties = selectedCampus.faculties;
    }
  }

  validateForm(): boolean {
    if (!this.student.name || !this.student.lastname || !this.student.email || !this.student.password) {
      this.snackBar.open('Por favor completa todos los campos personales', 'Cerrar', { duration: 3000 });
      return false;
    }

    if (!this.selectedUniversityId || !this.selectedCampusId || !this.selectedFacultyId) {
      this.snackBar.open('Por favor selecciona universidad, campus y facultad', 'Cerrar', { duration: 3000 });
      return false;
    }

    return true;
  }

  onSubmit(): void {
    if (!this.validateForm()) return;

    const selectedUniversity = this.universities.find(u => u.id === this.selectedUniversityId);
    if (!selectedUniversity) return;

    this.isLoading = true;
    this.student.institution_name = selectedUniversity.name;
    this.student.campus_id = this.selectedCampusId || 0;
    this.student.faculty_id = this.selectedFacultyId || 0;
    this.student.role = this.selectedRole;

    this.dataService.registerStudent(this.student)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Registration error:', error);
          let errorMessage = 'Error al registrar usuario';

          if (error.status === 500) {
            errorMessage = 'Error en el servidor. Por favor intenta más tarde';
          } else if (error.status === 0) {
            errorMessage = 'No se pudo conectar con el servidor';
          }

          this.snackBar.open(errorMessage, 'Cerrar', { duration: 5000 });
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.snackBar.open('Registro exitoso', 'Cerrar', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });

            // Usar setTimeout para asegurar que el snackbar se muestre antes de la navegación
            setTimeout(() => {
              this.router.navigate(['/login'])
                .then(() => console.log('Navigation successful'))
                .catch(err => console.error('Navigation error:', err));
            }, 3000);
          }
        }
      });
  }
}
