import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, map, BehaviorSubject, tap, of} from 'rxjs';
import { University, Campus, Faculty, Student } from '../interfaces/university';
import { switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'https://bioface-backend.onrender.com';

  private currentUserSubject = new BehaviorSubject<Student | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {

    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          this.currentUserSubject.next(user);
        } catch (e) {
          console.error('Error al analizar la usuario almacenado:', e);
          localStorage.removeItem('currentUser');
        }
      }
    }
  }
  
  //hecho!
  getUserSelf(): Observable<Student | null>{
    return this.http.get<Student>(`${this.baseUrl}/api/v1/auth/user/me`);
  }
  login(email: string, password: string): Observable<Student | null> {
    return this.http.post<any>(`${this.baseUrl}/api/v1/auth/login`, {
      email: email,
      password: password
    }).pipe(
        switchMap((response: any) => {
            if (response && response.message === "Login successful") {
                return this.getUserSelf();
            }
            return of(null);
        }),
        catchError(error => {
          console.error('Error de inicio de sesión:', error);
          return of(null);
      }),
    );
  }


  //hecho!
  logout(): void {
    this.http.post<any>(`${this.baseUrl}/api/v1/auth/logout`,{})
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }
  //hecho!
  updateStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.baseUrl}/api/v1/auth/user/me`, student).pipe(
      tap(updatedStudent => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('currentUser', JSON.stringify(updatedStudent));
        }
        this.currentUserSubject.next(updatedStudent);
      })
    );
  }

  private campusesCache = new BehaviorSubject<Campus[]>([]);
  private universitiesCache = new BehaviorSubject<University[]>([]);

  //hecho!
  getCampuses(): Observable<Campus[]> {
    if (this.campusesCache.value.length) {
      return of(this.campusesCache.value);
    }

    return this.http.get<University[]>(`${this.baseUrl}/api/v1/campus/get_all`).pipe(
      map(response => response[0].campuses),
      tap(campuses => this.campusesCache.next(campuses))
    );
  }
  //hecho!
  getCampusName(campusId: number): Observable<string> {
    return this.http.get<Campus>(`${this.baseUrl}/api/v1/campus/get/${campusId}`).pipe(
      map(response => response.name),
      catchError(() => of('Campus no encontrado'))
    )
  }
  //hecho!
  getFacultyName(campusId: number, facultyId: number): Observable<string> {
    return this.http.get<Faculty[]>(`${this.baseUrl}/api/v1/campus/get-faculties/${campusId}`).pipe(
      map(faculties => {
        const response = faculties.find(f => f.id === facultyId);
        return response? response.name: 'Facultad no encontrada';
      }),
      catchError(() => of('Facultad no encontrada'))
    )
  }
  //hecho!
  getUniversities(): Observable<University[]> {
    return this.http.get<University[]>(`${this.baseUrl}/api/v1/university/get_all`);
  }
  //hecho!
  getFaculties(campusId: number): Observable<Faculty[]> {
    return this.http.get<University>(`${this.baseUrl}/api/v1/university/get_campuses/0`)
      .pipe(
        map(
          response =>{
            const campus = response.campuses.find((c: Campus) => c.id === Number(campusId));
            return campus ? campus.faculties : [];
          }
        )
      )
  }

  getStudents(campusId: number, facultyId: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/students`)
      .pipe(
        map(students => students.filter(student =>
          student.campus_id === Number(campusId) &&
          student.faculty_id === Number(facultyId)
        ))
      );
  }
  //hecho!
  registerStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.baseUrl}/api/v1/auth/register`, student)
  }



}
