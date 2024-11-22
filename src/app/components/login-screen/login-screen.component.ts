import {Component, signal} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {RouterLink} from "@angular/router";

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { DataService } from '../../services/data.service';
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-login-screen',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    RouterLink,
    FormsModule,
    MatSnackBarModule,
    CommonModule,
  ],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.css'
})
export class LoginScreenComponent {
  hide = signal(true);
  loginData = {
    email: '',
    password: ''
  };

  constructor(
    private dataService: DataService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  clickEvent(event: Event): void {
    event.preventDefault();
    this.hide.set(!this.hide());
  }

  onSubmit(): void {
    if (this.loginData.email && this.loginData.password) {
      this.dataService.login(this.loginData.email, this.loginData.password).subscribe({
        next: (student) => {
          if (student) {
            // Aquí podrías guardar los datos del usuario en localStorage si lo necesitas
            localStorage.setItem('currentUser', JSON.stringify(student));
            this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', { duration: 2000 });
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 1000);
          } else {
            this.snackBar.open('Credenciales incorrectas', 'Cerrar', { duration: 3000 });
          }
        },
        error: (error) => {
          this.snackBar.open('Error al iniciar sesión', 'Cerrar', { duration: 3000 });
          console.error('Error:', error);
        }
      });
    } else {
      this.snackBar.open('Por favor ingresa email y contraseña', 'Cerrar', { duration: 3000 });
    }
  }
}
