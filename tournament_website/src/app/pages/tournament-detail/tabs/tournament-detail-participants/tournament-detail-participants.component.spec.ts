import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentDetailParticipantsComponent } from './tournament-detail-participants.component';

describe('TournamentDetailParticipantsComponent', () => {
  let component: TournamentDetailParticipantsComponent;
  let fixture: ComponentFixture<TournamentDetailParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentDetailParticipantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TournamentDetailParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
