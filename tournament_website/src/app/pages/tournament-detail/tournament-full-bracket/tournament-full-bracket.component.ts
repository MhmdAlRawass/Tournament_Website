import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  Match,
  MatchesByGroup,
  Participant,
  ParticipantStat,
} from '../../../models/match.model';
import { TournamentService } from '../../../services/tournament.service';
import { Tournament } from '../../../models/tournament.model';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tournament-full-bracket',
  imports: [CommonModule, MatIconModule],
  templateUrl: './tournament-full-bracket.component.html',
  styleUrl: './tournament-full-bracket.component.css',
})
export class TournamentFullBracketComponent implements OnInit {
  // @Input() groupedMatches?: MatchesByGroup;
  tournament!: Tournament;

  matches: Match[] = [];
  participants: Participant[] = [];
  groupedMatches: MatchesByGroup = {};
  groupedStats: { [groupId: string]: ParticipantStat[] } = {};
  selectedGroupId: string = '';
  isFullScreen: boolean = true;

  @ViewChild('fullscreenContainer') fullscreenContainer?: ElementRef;

  enterFullscreen() {
    const elem = this.fullscreenContainer?.nativeElement;
    if (!elem) return;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if ((elem as any).webkitRequestFullscreen) {
      (elem as any).webkitRequestFullscreen();
    } else if ((elem as any).msRequestFullscreen) {
      (elem as any).msRequestFullscreen();
    }
  }

  bracketData = [
    {
      matches: [
        {
          top: { seed: 1, name: 'Orlando Jetsetters', score: 2 },
          bottom: { seed: 16, name: 'Boston Blizzards', score: 0 },
          winner: 'top',
        },
        {
          top: { seed: 8, name: 'D.C. Senators', score: 2 },
          bottom: { seed: 9, name: 'Houston Hurricanes', score: 1 },
          winner: 'top',
        },
        {
          top: { seed: 5, name: 'West Virginia Runners', score: 2 },
          bottom: { seed: 12, name: 'Miami Waves', score: 0 },
          winner: 'top',
        },
        {
          top: { seed: 4, name: 'New Orleans Rockstars', score: 2 },
          bottom: { seed: 13, name: 'Phoenix Firebirds', score: 1 },
          winner: 'top',
        },
        {
          top: { seed: 6, name: 'Seattle Climbers', score: 2 },
          bottom: { seed: 11, name: 'Las Vegas Aces', score: 0 },
          winner: 'top',
        },
        {
          top: { seed: 3, name: 'San Francisco Porters', score: 2 },
          bottom: { seed: 14, name: 'Atlanta Eagles', score: 1 },
          winner: 'top',
        },
        {
          top: { seed: 7, name: 'Chicago Pistons', score: 2 },
          bottom: { seed: 10, name: 'Dallas Rangers', score: 1 },
          winner: 'top',
        },
        {
          top: { seed: 2, name: 'Denver Demon Horses', score: 2 },
          bottom: { seed: 15, name: 'Portland Paddlers', score: 0 },
          winner: 'top',
        },
      ],
    },
    {
      matches: [
        {
          top: { seed: 1, name: 'Orlando Jetsetters', score: 2 },
          bottom: { seed: 8, name: 'D.C. Senators', score: 1 },
          winner: 'top',
        },
        {
          top: { seed: 5, name: 'West Virginia Runners', score: 2 },
          bottom: { seed: 4, name: 'New Orleans Rockstars', score: 1 },
          winner: 'top',
        },
        {
          top: { seed: 6, name: 'Seattle Climbers', score: 1 },
          bottom: { seed: 3, name: 'San Francisco Porters', score: 2 },
          winner: 'bottom',
        },
        {
          top: { seed: 7, name: 'Chicago Pistons', score: 0 },
          bottom: { seed: 2, name: 'Denver Demon Horses', score: 2 },
          winner: 'bottom',
        },
      ],
    },
    {
      matches: [
        {
          top: { seed: 1, name: 'Orlando Jetsetters', score: 2 },
          bottom: { seed: 5, name: 'West Virginia Runners', score: 1 },
          winner: 'top',
        },
        {
          top: { seed: 3, name: 'San Francisco Porters', score: 2 },
          bottom: { seed: 2, name: 'Denver Demon Horses', score: 1 },
          winner: 'top',
        },
      ],
    },
    {
      matches: [
        {
          top: { seed: 1, name: 'Orlando Jetsetters', score: 3 },
          bottom: { seed: 3, name: 'San Francisco Porters', score: 2 },
          winner: 'top',
        },
      ],
    },
  ];

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

            // ✅ Generate bracketData only after groupedMatches is available
            // this.bracketData = this.generateBracketData(this.groupedMatches);
          },
          error: (err) => {
            console.error('Error loading data: ', err);
          },
        });
      },
      error: (err) => console.error(err),
    });
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

  generateBracketData(MatchesByGroup: MatchesByGroup): any[] {
    const bracketData: any = [];

    const finalStageRounds = MatchesByGroup['null'];

    if (!finalStageRounds) return [];

    const sortedRounds = Object.keys(finalStageRounds)
      .map(Number)
      .sort((a, b) => a - b);

    for (const round of sortedRounds) {
      const matches = finalStageRounds[round];
      const formattedMatches = matches.map((match) => {
        const [score1Str, score2Str] = match.scores_csv.split('-');
        const score1 = parseInt(score1Str ?? '0');
        const score2 = parseInt(score2Str ?? '0');

        const p1 = this.tournamentService.getParticipantByIdForFinalStage(
          match.player1_id
        );
        const p2 = this.tournamentService.getParticipantByIdForFinalStage(
          match.player2_id
        );

        const top = {
          seed: p1?.name ?? 0,
          name: p1?.name ?? 'Unkown',
          score: score1 ?? 'N/A',
        };

        const bottom = {
          seed: p2?.seed ?? 0,
          name: p2?.name ?? 'Unkown',
          score: score2 ?? 'N/A',
        };

        let winner: 'top' | 'bottom' | undefined;
        if (match.winner_id === match.player1_id) {
          winner = 'top';
        } else if (match.winner_id === match.player2_id) {
          winner = 'bottom';
        }
        return {
          top,
          bottom,
          winner,
        };
      });

      bracketData.push({ matches: formattedMatches });
    }
    return bracketData;
  }
}
