import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TournamentService } from '../../services/tournament.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TournamentDetailHeaderComponent } from './tournament-detail-header/tournament-detail-header.component';
import { TournamentDetailOverviewComponent } from './tabs/tournament-detail-overview/tournament-detail-overview.component';
import { TournamentDetailBracketComponent } from './tabs/tournament-detail-bracket/tournament-detail-bracket.component';
import { TournamentDetailMatchesComponent } from './tabs/tournament-detail-matches/tournament-detail-matches.component';
import { TournamentDetailParticipantsComponent } from './tabs/tournament-detail-participants/tournament-detail-participants.component';
import { Tournament } from '../../models/tournament.model';

@Component({
  selector: 'app-tournament-detail',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    TournamentDetailHeaderComponent,
    TournamentDetailOverviewComponent,
    TournamentDetailBracketComponent,
    TournamentDetailMatchesComponent,
    TournamentDetailParticipantsComponent,
  ],
  templateUrl: './tournament-detail.component.html',
  styleUrl: './tournament-detail.component.css',
})
export class TournamentDetailComponent implements OnInit {
  tournament!: Tournament;
  selectedTab: string = 'overview';

  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.tournamentService.getTournaments().subscribe({
      next: () => {
        this.tournament = this.tournamentService.getTournamentById(id)!;
      },
      error: (err) => console.error(err),
    });
  }

  changeTab(tab: string) {
    this.selectedTab = tab;
  }
}
