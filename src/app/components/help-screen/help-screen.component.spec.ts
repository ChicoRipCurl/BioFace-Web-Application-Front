import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HelpScreenComponent } from './help-screen.component';

describe('HelpScreenComponent', () => {
  let component: HelpScreenComponent;
  let fixture: ComponentFixture<HelpScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpScreenComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HelpScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select FAQ when clicked', () => {
    const firstFaq = component.faqs[0];
    component.selectFaq(firstFaq);
    expect(component.selectedFaq).toBe(firstFaq);
  });
});
