import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterParticipantDialogComponent } from './register-participant-dialog.component';

describe('RegisterParticipantDialogComponent', () => {
  let component: RegisterParticipantDialogComponent;
  let fixture: ComponentFixture<RegisterParticipantDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterParticipantDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterParticipantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
