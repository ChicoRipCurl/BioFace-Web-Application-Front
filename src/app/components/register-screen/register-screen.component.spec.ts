import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataService } from '../../services/data.service';
import { RegisterScreenComponent } from './register-screen.component';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
describe('RegisterScreenComponent', () => {
  let component: RegisterScreenComponent;
  let fixture: ComponentFixture<RegisterScreenComponent>;
  let dataService: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('DataService', ['getUniversities', 'getCampuses', 'getFaculties', 'registerStudent']);
    // Devuelve valores simulados para cada método según sea necesario
    spy.getUniversities.and.returnValue(of([]));
    spy.getCampuses.and.returnValue(of([]));
    spy.getFaculties.and.returnValue(of([]));
    spy.registerStudent.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [RegisterScreenComponent],
      providers: [
        { provide: DataService, useValue: spy }
      ]
    })
      .compileComponents();

    dataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUniversities on init', () => {
    expect(dataService.getUniversities).toHaveBeenCalled();
  });
});
