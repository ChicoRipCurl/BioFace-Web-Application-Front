import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditProfileDialogComponent } from './edit-profile-dialog.component';
import { FormsModule } from '@angular/forms';

describe('EditProfileDialogComponent', () => {
  let component: EditProfileDialogComponent;
  let fixture: ComponentFixture<EditProfileDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [EditProfileDialogComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: { close: jasmine.createSpy('close') }
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { name: 'John', lastname: 'Doe', email: 'john.doe@example.com', profile_picture: '' }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog with edited user data on save', () => {
    component.editedUser.name = 'Jane';
    component.onSave();
    expect(component.dialogRef.close).toHaveBeenCalledWith(component.editedUser);
  });

  it('should close the dialog on cancel', () => {
    component.onCancel();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });
});
