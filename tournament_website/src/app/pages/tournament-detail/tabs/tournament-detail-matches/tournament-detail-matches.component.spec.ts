import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentDetailMatchesComponent } from './tournament-detail-matches.component';

describe('TournamentDetailMatchesComponent', () => {
  let component: TournamentDetailMatchesComponent;
  let fixture: ComponentFixture<TournamentDetailMatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentDetailMatchesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TournamentDetailMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
