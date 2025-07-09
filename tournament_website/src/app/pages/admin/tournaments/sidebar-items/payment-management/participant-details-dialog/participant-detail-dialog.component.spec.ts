import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantDetailDialogComponent } from './participant-detail-dialog.component';

describe('ParticipantDetailDialogComponent', () => {
  let component: ParticipantDetailDialogComponent;
  let fixture: ComponentFixture<ParticipantDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipantDetailDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipantDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
