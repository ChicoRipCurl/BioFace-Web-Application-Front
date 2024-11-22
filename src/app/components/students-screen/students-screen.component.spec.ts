import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentsScreenComponent } from './students-screen.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('StudentsScreenComponent', () => {
  let component: StudentsScreenComponent;
  let fixture: ComponentFixture<StudentsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StudentsScreenComponent,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
