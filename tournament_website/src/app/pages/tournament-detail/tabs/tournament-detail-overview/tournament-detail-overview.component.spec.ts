import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentDetailOverviewComponent } from './tournament-detail-overview.component';

describe('TournamentDetailOverviewComponent', () => {
  let component: TournamentDetailOverviewComponent;
  let fixture: ComponentFixture<TournamentDetailOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentDetailOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TournamentDetailOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
