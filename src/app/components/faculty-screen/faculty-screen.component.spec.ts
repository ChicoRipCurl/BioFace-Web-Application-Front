import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FacultyScreenComponent } from './faculty-screen.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('FacultyScreenComponent', () => {
  let component: FacultyScreenComponent;
  let fixture: ComponentFixture<FacultyScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FacultyScreenComponent,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FacultyScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
