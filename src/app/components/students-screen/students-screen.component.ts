import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Student } from '../../interfaces/university';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-students-screen',
  templateUrl: './students-screen.component.html',
  imports: [CommonModule, HttpClientModule],
  standalone: true,
  styleUrls: ['./students-screen.component.css'],
  providers: [DataService]
})
export class StudentsScreenComponent implements OnInit, OnDestroy {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  searchTerm: string = '';
  loading: boolean = false;
  campusId: number = 0;
  facultyId: number = 0;
  private searchSubject = new Subject<string>();
  private subscription: Subscription = new Subscription();

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.campusId = +params['campusId'];
      this.facultyId = +params['facultyId'];
      this.loadStudents();
    });
    this.setupSearch();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadStudents(): void {
    this.loading = true;
    this.subscription.add(
      this.dataService.getStudents(this.campusId, this.facultyId).subscribe({
        next: (data) => {
          this.students = data;
          this.filteredStudents = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading students:', error);
          this.loading = false;
        }
      })
    );
  }

  private setupSearch(): void {
    this.subscription.add(
      this.searchSubject.pipe(
        debounceTime(300),
        distinctUntilChanged()
      ).subscribe(searchTerm => {
        this.filterStudents(searchTerm);
      })
    );
  }

  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchTerm);
  }

  private filterStudents(searchTerm: string): void {
    this.filteredStudents = this.students.filter(student =>
      `${student.name} ${student.lastname}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  handleError(student: Student): void {
    console.error(`Error loading image for student: ${student.name} ${student.lastname}`);
  }

  getFullName(student: Student): string {
    return `${student.name} ${student.lastname}`;
  }
}
