import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Faculty } from '../../interfaces/university';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-faculty-screen',
  templateUrl: './faculty-screen.component.html',
  imports: [CommonModule, HttpClientModule],
  standalone: true,
  styleUrls: ['./faculty-screen.component.css'],
  providers: [DataService]
})
export class FacultyScreenComponent implements OnInit, OnDestroy {
  faculties: Faculty[] = [];
  filteredFaculties: Faculty[] = [];
  searchTerm: string = '';
  loading: boolean = false;
  campusId: number = 0;
  private searchSubject = new Subject<string>();
  private subscription: Subscription = new Subscription();

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.campusId = +params['campusId'];
      this.loadFaculties();
    });
    this.setupSearch();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadFaculties(): void {
    this.loading = true;
    this.subscription.add(
      this.dataService.getFaculties(this.campusId).subscribe({
        next: (data) => {
          this.faculties = data;
          this.filteredFaculties = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading faculties:', error);
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
        this.filterFaculties(searchTerm);
      })
    );
  }

  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchTerm);
  }

  private filterFaculties(searchTerm: string): void {
    this.filteredFaculties = this.faculties.filter(faculty =>
      faculty.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  navigateToStudents(facultyId: number): void {
    this.router.navigate(['/students', this.campusId, facultyId]);
  }

  handleError(faculty: Faculty): void {
    console.error(`Error loading image for faculty: ${faculty.name}`);
  }
}
