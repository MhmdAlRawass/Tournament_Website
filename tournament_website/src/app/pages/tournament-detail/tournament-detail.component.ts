declare var gtag: Function;

import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TournamentService } from '../../services/tournament.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TournamentDetailHeaderComponent } from './tournament-detail-header/tournament-detail-header.component';
import { TournamentDetailOverviewComponent } from './tabs/tournament-detail-overview/tournament-detail-overview.component';
import { TournamentDetailMatchesComponent } from './tabs/tournament-detail-matches/tournament-detail-matches.component';
import { TournamentDetailStandingsComponent } from './tabs/tournament-detail-standings/tournament-detail-standings.component';
import { TournamentDetailParticipantsComponent } from './tabs/tournament-detail-participants/tournament-detail-participants.component';
import { Tournament } from '../../models/tournament.model';
import { forkJoin, Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  Match,
  MatchesByGroup,
  Participant,
  ParticipantStat,
} from '../../models/match.model';
import { TestBracketComponent } from './tabs/test-bracket/test-bracket.component';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-tournament-detail',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    TournamentDetailHeaderComponent,
    TournamentDetailOverviewComponent,
    TournamentDetailMatchesComponent,
    TournamentDetailStandingsComponent,
    TournamentDetailParticipantsComponent,
    TestBracketComponent,
    MatDialogModule,
  ],
  templateUrl: './tournament-detail.component.html',
  styleUrl: './tournament-detail.component.css',
})
export class TournamentDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('lottieContainer', { static: false }) lottieContainer!: ElementRef;

  tournament!: Tournament;
  selectedTab: string = 'overview';

  matches: Match[] = [];
  participants: Participant[] = [];
  groupedMatches: MatchesByGroup = {};
  groupedStats: { [groupId: string]: ParticipantStat[] } = {};

  selectedGroupId: string = '';

  isLoading: boolean = true;
  isError: boolean = false;

  private pollingSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService
  ) {}

  ngOnInit(): void {
    // for tab selection
    const savedTab = localStorage.getItem('selectedTab');
    if (savedTab) {
      this.selectedTab = savedTab;
    }
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.tournamentService.getTournaments().subscribe({
      next: () => {
        this.tournament = this.tournamentService.getTournamentById(id)!;

        // Initial load + start polling every 10 seconds
        this.startPollingData();
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.isError = true;
      },
    });
  }

  ngAfterViewInit(): void {
    if (this.lottieContainer) {
      // @ts-ignore
      lottie.loadAnimation({
        container: this.lottieContainer.nativeElement,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/assets/animations/loading.json',
      });
    } else {
      // console.warn('Lottie container not available');
    }
  }

  ngOnDestroy(): void {
    // Stop polling when leaving the page
    if (this.pollingSub) {
      this.pollingSub.unsubscribe();
    }
  }

  private startPollingData(): void {
    this.pollingSub = interval(10000) // every 10 seconds
      .pipe(
        // on each tick, call forkJoin to fetch fresh data
        switchMap(() =>
          forkJoin({
            matches: this.tournamentService.getMatches(this.tournament.id),
            participants: this.tournamentService.getParticipants(
              this.tournament.id
            ),
            stat: this.tournamentService.getParticipantsStat(
              this.tournament.id
            ),
          })
        )
      )
      .subscribe({
        next: ({ matches, participants, stat }) => {
          this.isLoading = false;
          this.matches = matches;
          this.groupedMatches =
            this.tournamentService.groupMatchesByGroupAndRound(matches);
          this.participants = participants;

          const enrichedStats = this.enrichParticipantStatsWithGroupId(
            stat,
            participants,
            matches
          );
          this.groupedStats = this.groupByGroupId(enrichedStats);

          // Keep first groupId selected if it's still valid
          const groupIds = Object.keys(this.groupedMatches);
          if (
            !this.selectedGroupId ||
            !groupIds.includes(this.selectedGroupId)
          ) {
            this.selectedGroupId = groupIds.length > 0 ? groupIds[0] : '';
          }
        },
        error: (err) => {
          console.error('Polling error: ', err);
          this.isLoading = false;
          this.isError = true;
        },
      });

    // Immediately load once (don’t wait 10 seconds for first tick)
    forkJoin({
      matches: this.tournamentService.getMatches(this.tournament.id),
      participants: this.tournamentService.getParticipants(this.tournament.id),
      stat: this.tournamentService.getParticipantsStat(this.tournament.id),
    }).subscribe({
      next: ({ matches, participants, stat }) => {
        this.isLoading = false;
        this.matches = matches;
        this.groupedMatches =
          this.tournamentService.groupMatchesByGroupAndRound(matches);
        this.participants = participants;

        const enrichedStats = this.enrichParticipantStatsWithGroupId(
          stat,
          participants,
          matches
        );
        this.groupedStats = this.groupByGroupId(enrichedStats);

        const groupIds = Object.keys(this.groupedMatches);
        this.selectedGroupId = groupIds.length > 0 ? groupIds[0] : '';
      },
      error: (err) => {
        console.error('Initial load error: ', err);
        this.isLoading = false;
        this.isError = true;
      },
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

  enrichParticipantStatsWithGroupId(
    participantStats: ParticipantStat[],
    participants: Participant[],
    matches: Match[]
  ): ParticipantStat[] {
    const playerIdToGroupMap = new Map<number, number>();

    // Build a map from player ID to group ID based on matches
    matches.forEach((match) => {
      if (match.player1_id != null) {
        playerIdToGroupMap.set(match.player1_id, match.group_id);
      }
      if (match.player2_id != null) {
        playerIdToGroupMap.set(match.player2_id, match.group_id);
      }
    });

    // Map group ID into each ParticipantStat
    return participantStats.map((stat) => {
      const participant = participants.find(
        (p) => p.id === stat.participant_id
      );

      if (participant) {
        // Find any group_player_id that has a group from matches
        const foundGroupId = participant.group_player_ids
          .map((pid) => playerIdToGroupMap.get(pid))
          .find((groupId) => groupId !== undefined);

        return {
          ...stat,
          group_id: foundGroupId ?? null,
        };
      }

      return stat;
    });
  }
}
