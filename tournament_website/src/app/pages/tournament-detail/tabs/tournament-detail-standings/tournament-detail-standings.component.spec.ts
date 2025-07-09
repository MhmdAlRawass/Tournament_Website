import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentDetailStandingsComponent } from './tournament-detail-standings.component';

describe('TournamentDetailStandingsComponent', () => {
  let component: TournamentDetailStandingsComponent;
  let fixture: ComponentFixture<TournamentDetailStandingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentDetailStandingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TournamentDetailStandingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
