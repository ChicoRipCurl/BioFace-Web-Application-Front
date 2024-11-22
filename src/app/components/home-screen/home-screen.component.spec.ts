import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeScreenComponent } from './home-screen.component';

describe('HomeScreenComponent', () => {
  let component: HomeScreenComponent;
  let fixture: ComponentFixture<HomeScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeScreenComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select student when access log is clicked', () => {
    const studentId = 1;
    component.selectStudent(studentId);
    expect(component.selectedStudent?.id).toBe(studentId);
  });

  it('should toggle student details when clicking same student', () => {
    const studentId = 1;
    component.toggleStudentDetails(studentId);
    expect(component.selectedStudent?.id).toBe(studentId);
    component.toggleStudentDetails(studentId);
    expect(component.selectedStudent).toBeNull();
  });

  it('should close student details when clicking close button', () => {
    const studentId = 1;
    component.toggleStudentDetails(studentId);
    expect(component.selectedStudent).toBeNull();
  });
});
