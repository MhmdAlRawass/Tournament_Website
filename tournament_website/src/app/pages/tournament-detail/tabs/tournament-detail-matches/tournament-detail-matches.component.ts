import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  Match,
  MatchesByGroup,
  Participant,
} from '../../../../models/match.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TournamentService } from '../../../../services/tournament.service';
import { TournamentFullBracketComponent } from '../../tournament-full-bracket/tournament-full-bracket.component';

@Component({
  selector: 'app-tournament-detail-matches',
  standalone: true,
  imports: [CommonModule, MatIconModule, TournamentFullBracketComponent],
  templateUrl: './tournament-detail-matches.component.html',
  styleUrl: './tournament-detail-matches.component.css',
})
export class TournamentDetailMatchesComponent implements OnInit {
  @Input() tournament: any;
  @Input() matches!: Match[];
  @Input() participants!: Participant[];
  @Input() groupedMatches!: MatchesByGroup;

  @ViewChildren('matchRef') matchRefs!: QueryList<ElementRef>;

  bracketData = [
    {
      matches: [
        {
          top: { seed: 1, name: 'Orlando Jetsetters', score: [] },
          bottom: { seed: 16, name: 'Boston Blizzards', score: [] },
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

  stageTabs: string[] = ['Groups', 'Rounds', 'final'];
  selectedStageTab: string = 'Groups';

  finalStageAvailable: boolean = false;

  timePlaying = {
    16435768: ['Sat 2:00 PM', 'Sat 3:30 PM', 'Sat 5:00 PM', 'Sat 6:30 PM'], // D
    16435836: ['Sat 11:00 AM', 'Sat 12:30 PM', 'Sun 12:00 PM', 'Sun 1:30 PM'], // E
  };

  timePlayingRounds = {
    16435768: {
      0: {
        1: ['Sat 2:00 PM - Court 1', 'Sat 2:00 PM - Court 2'], // Round 1, match 1 & 2 times
        2: ['Sat 2:30 PM - Court 1', 'Sat 2:30 PM - Court 2'], // Round 2, match 1 & 2 times
        3: ['Sat 3:00 PM - Court 1', 'Sat 3:00 PM - Court 2'], // Round 3, match 1 & 2 times
      },
      1: {
        1: ['Sat 3:30 PM - Court 1', 'Sat 3:30 PM - Court 2'], // Round 1, match 1 & 2 times
        2: ['Sat 4:00 PM - Court 1', 'Sat 4:00 PM - Court 2'], // Round 2, match 1 & 2 times
        3: ['Sat 4:30 PM - Court 1', 'Sat 4:30 PM - Court 2'], // Round 3, match 1 & 2 times
      },
      2: {
        1: ['Sat 5:00 PM - Court 1', 'Sat 5:00 PM - Court 2'], // Round 1, match 1 & 2 times
        2: ['Sat 5:30 PM - Court 1', 'Sat 5:30 PM - Court 2'], // Round 2, match 1 & 2 times
        3: ['Sat 6:00 PM - Court 1', 'Sat 6:00 PM - Court 2'], // Round 3, match 1 & 2 times
      },
      3: {
        1: ['Sat 6:30 PM - Court 1', 'Sat 6:30 PM - Court 2'], // Round 1, match 1 & 2 times
        2: ['Sat 7:00 PM - Court 1', 'Sat 7:00 PM - Court 2'], // Round 2, match 1 & 2 times
        3: ['Sat 7:30 PM - Court 1', 'Sat 7:30 PM - Court 2'], // Round 3, match 1 & 2 times
      },
    }, //D
    16435836: {
      0: {
        1: ['Sat 11:00 AM - Court 1', 'Sat 11:00 AM - Court 2'], // Round 1, match 1 & 2 times
        2: ['Sat 11:30 AM - Court 1', 'Sat 11:30 AM - Court 2'], // Round 2, match 1 & 2 times
        3: ['Sat 12:00 PM - Court 1', 'Sat 12:00 PM - Court 2'], // Round 3, match 1 & 2 times
      },
      1: {
        1: ['Sat 12:30 PM - Court 1', 'Sat 12:30 PM - Court 2'], // Round 1, match 1 & 2 times
        2: ['Sat 1:00 PM - Court 1', 'Sat 1:00 PM - Court 2'], // Round 2, match 1 & 2 times
        3: ['Sat 1:30 PM - Court 1', 'Sat 1:30 PM - Court 2'], // Round 3, match 1 & 2 times
      },
      2: {
        1: ['Sun 12:00 PM - Court 1', 'Sun 12:00 PM - Court 2'], // Round 1, match 1 & 2 times
        2: ['Sun 12:30 PM - Court 1', 'Sun 12:30 PM - Court 2'], // Round 2, match 1 & 2 times
        3: ['Sun 1:00 PM - Court 1', 'Sun 1:00 PM - Court 2'], // Round 3, match 1 & 2 times
      },
      3: {
        1: ['Sun 1:30 PM - Court 1', 'Sun 1:30 PM - Court 2'], // Round 1, match 1 & 2 times
        2: ['Sun 2:00 PM - Court 1', 'Sun 2:00 PM - Court 2'], // Round 2, match 1 & 2 times
        3: ['Sun 2:30 PM - Court 1', 'Sun 2:30 PM - Court 2'], // Round 3, match 1 & 2 times
      },
    }, //E
  };

  constructor(private tournamentService: TournamentService) {}

  ngOnInit(): void {
    this.finalStageAvailable = this.getFinalStageIds().length > 0;
    this.bracketData = this.generateBracketData(this.groupedMatches);
  }

  changeStageTab(tab: string) {
    this.selectedStageTab = tab;
  }

  objectKeys = Object.keys;

  getGroupStageIds(): string[] {
    return this.objectKeys(this.groupedMatches).filter(
      (id) => id !== 'null' && id !== null && id !== undefined
    );
  }

  getFinalStageIds(): string[] {
    return this.objectKeys(this.groupedMatches).filter((id) => id === 'null');
  }

  getSortedRounds(groupId: string): number[] {
    return Object.keys(this.groupedMatches[groupId])
      .map(Number)
      .sort((a, b) => a - b);
  }

  getSetScores(scores_csv: string): [string, string][] {
    if (!scores_csv) return [];
    return scores_csv.split(',').map((set) => {
      const [p1, p2] = set.split('-').map((s) => s.trim());
      return [p1 || '0', p2 || '0'];
    });
  }

  getPlayerName(playerId: number): string {
    const participant = this.participants.find(
      (p) => p.group_player_ids[0] === playerId
    );
    return participant ? participant.name : 'Unknown';
  }

  getFinalStagePlayerName(playerId: number): string {
    const participant = this.participants.find((p) => p.id === playerId);
    return participant ? participant.name : 'Unknown';
  }

  getCustomGroupLabel(index: number): string {
    return 'Group ' + String.fromCharCode(65 + index);
  }

  syncScroll(source: HTMLElement, target: HTMLElement) {
    target.scrollLeft = source.scrollLeft;
  }

  getParticipantsByGroup(groupId: string): Participant[] {
    const p_list = [];
    for (const p of this.participants) {
      if (p.group_id === Number(groupId)) {
        p_list.push(p);
      }
    }
    return p_list;
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

  isValidScore(score: any): boolean {
    return !isNaN(score);
  }

  isWaitingWinner(name: string): boolean {
    return name === '';
  }
}
