import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchScreenComponent } from './search-screen.component';
import { DataService } from '../../services/data.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('SearchScreenComponent', () => {
  let component: SearchScreenComponent;
  let fixture: ComponentFixture<SearchScreenComponent>;
  let dataService: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('DataService', ['getCampuses']);
    spy.getCampuses.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ SearchScreenComponent ],
      providers: [
        { provide: DataService, useValue: spy }
      ]
    })
      .compileComponents();

    dataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load campuses on init', () => {
    expect(dataService.getCampuses).toHaveBeenCalled();
  });
});
