import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {Student} from "../university";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {MatFormField} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface EditUserData extends Omit<Student, 'password'> {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}



@Component({
  selector: 'app-edit-profile-dialog',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    CommonModule,
    MatFormField,
    FormsModule,
    MatInput, MatInputModule, MatFormFieldModule
  ],
  templateUrl: './edit-profile-dialog.component.html',
  styleUrl: './edit-profile-dialog.component.css'
})
export class EditProfileDialogComponent {
  editedUser: EditUserData;
  showPassword: boolean = false;
  passwordError: string = '';


  constructor(
    public dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student
  ) {

    this.editedUser = {
      ...data,
      currentPassword: data.password,
      newPassword: '',
      confirmPassword: ''
    };
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  validatePasswords(): boolean {
    if (!this.editedUser.newPassword && !this.editedUser.confirmPassword) {
      return true;
    }

    if (this.editedUser.newPassword !== this.editedUser.confirmPassword) {
      this.passwordError = 'Las contraseñas no coinciden';
      return false;
    }

    if (this.editedUser.newPassword.length < 6) {
      this.passwordError = 'La contraseña debe tener al menos 6 caracteres';
      return false;
    }

    this.passwordError = '';
    return true;
  }

  onSave(): void {
    if (this.validatePasswords()) {

      const userToSave: Student = {
        id: this.editedUser.id,
        name: this.editedUser.name,
        lastname: this.editedUser.lastname,
        email: this.editedUser.email,
        password: this.editedUser.newPassword || this.editedUser.currentPassword,
        institution_name: this.editedUser.institution_name,
        profile_picture: this.editedUser.profile_picture,
        role: this.editedUser.role,
        campus_id: this.editedUser.campus_id,
        faculty_id: this.editedUser.faculty_id
      };

      this.dialogRef.close(userToSave);
    }
  }
}
