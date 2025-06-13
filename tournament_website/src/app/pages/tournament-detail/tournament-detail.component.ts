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
import { forkJoin } from 'rxjs';
import {
  Match,
  MatchesByGroup,
  Participant,
  ParticipantStat,
} from '../../models/match.model';
import { TestBracketComponent } from './tabs/test-bracket/test-bracket.component';

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
    TestBracketComponent,
  ],
  templateUrl: './tournament-detail.component.html',
  styleUrl: './tournament-detail.component.css',
})
export class TournamentDetailComponent implements OnInit {
  tournament!: Tournament;
  selectedTab: string = 'overview';

  matches: Match[] = [];
  participants: Participant[] = [];
  groupedMatches: MatchesByGroup = {};
  groupedStats: { [groupId: string]: ParticipantStat[] } = {};

  selectedGroupId: string = '';

  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.tournamentService.getTournaments().subscribe({
      next: () => {
        this.tournament = this.tournamentService.getTournamentById(id)!;

        forkJoin({
          matches: this.tournamentService.getMatches(this.tournament.id),
          participants: this.tournamentService.getParticipants(
            this.tournament.id
          ),
          stat: this.tournamentService.getParticipantsStat(this.tournament.id),
        }).subscribe({
          next: ({ matches, participants, stat }) => {
            this.matches = matches;
            this.groupedMatches =
              this.tournamentService.groupMatchesByGroupAndRound(matches);
            this.participants = participants;
            this.groupedStats = this.groupByGroupId(stat);

            // Set the first groupId for bracket rendering (if exists)
            const groupIds = Object.keys(this.groupedMatches);
            this.selectedGroupId = groupIds.length > 0 ? groupIds[0] : '';
          },
          error: (err) => {
            console.error('Error loading data: ', err);
          },
        });
      },
      error: (err) => console.error(err),
    });
  }

  changeTab(tab: string) {
    this.selectedTab = tab;
  }

  groupByGroupId(stats: ParticipantStat[]): {
    [groupId: string]: ParticipantStat[];
  } {
    const grouped: { [groupId: string]: ParticipantStat[] } = {};

    stats.forEach((stat) => {
      if (!grouped[stat.group_id]) {
        grouped[stat.group_id] = [];
      }
      grouped[stat.group_id].push(stat);
    });
    return grouped;
  }
}
