import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Campus } from '../../interfaces/university';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-search-screen',
  templateUrl: './search-screen.component.html',
  imports: [CommonModule, HttpClientModule],
  standalone: true,
  styleUrls: ['./search-screen.component.css'],
  providers: [DataService]
})
export class SearchScreenComponent implements OnInit, OnDestroy {
  campuses: Campus[] = [];
  filteredCampuses: Campus[] = [];
  searchTerm: string = '';
  loading: boolean = false;
  private searchSubject = new Subject<string>();
  private subscription: Subscription = new Subscription();

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCampuses();
    this.setupSearch();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadCampuses(): void {
    this.loading = true;
    this.subscription.add(
      this.dataService.getCampuses().subscribe({
        next: (data) => {
          this.campuses = data;
          this.filteredCampuses = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading campuses:', error);
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
        this.filterCampuses(searchTerm);
      })
    );
  }

  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchTerm);
  }

  private filterCampuses(searchTerm: string): void {
    this.filteredCampuses = this.campuses.filter(campus =>
      campus.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  navigateToFaculties(campusId: number): void {
    this.router.navigate(['/faculty', campusId]);
  }

  handleError(campus: Campus) {
    console.error(`Error loading image for campus: ${campus.name}`);
  }

}
