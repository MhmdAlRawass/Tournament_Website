import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  viewChild,
} from '@angular/core';
import { MatchesByGroup } from '../../../../models/match.model';
import { TournamentService } from '../../../../services/tournament.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-test-bracket',
  templateUrl: './test-bracket.component.html',
  styleUrls: ['./test-bracket.component.css'],
  imports: [CommonModule, RouterModule],
})
export class TestBracketComponent implements OnInit {
  @Input() groupedMatches?: MatchesByGroup;

  @ViewChild('fullscreenContainer') fullscreenContainer?: ElementRef;

  enterFullscreen() {
    const elem = this.fullscreenContainer?.nativeElement;
    if (!elem) return;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if ((elem as any).webkitRequestFullscreen) {
      (elem as any).webkitRequestFullscreen(); // Safari
    } else if ((elem as any).msRequestFullscreen) {
      (elem as any).msRequestFullscreen(); // IE11
    }
  }

  bracketData = [
    {
      matches: [
        {
          top: { seed: 1, name: 'Orlando Jetsetters', score: 2 },
          bottom: { seed: 8, name: 'D.C. Senators', score: 1 },
          winner: 'top',
        },
        {
          top: { seed: 4, name: 'New Orleans Rockstars', score: 1 },
          bottom: { seed: 5, name: 'West Virginia Runners', score: 2 },
          winner: 'bottom',
        },
        {
          top: { seed: 2, name: 'Denver Demon Horses', score: 2 },
          bottom: { seed: 7, name: 'Chicago Pistons', score: 0 },
          winner: 'top',
        },
        {
          top: { seed: 3, name: 'San Francisco Porters', score: 2 },
          bottom: { seed: 6, name: 'Seattle Climbers', score: 1 },
          winner: 'top',
        },
      ],
    },
    {
      matches: [
        {
          top: { seed: 1, name: 'Orlando Jetsetters', score: 1 },
          bottom: { seed: 5, name: 'West Virginia Runners', score: 2 },
          winner: 'bottom',
        },
        {
          top: { seed: 2, name: 'Denver Demon Horses', score: 1 },
          bottom: { seed: 3, name: 'San Francisco Porters', score: 2 },
          winner: 'bottom',
        },
      ],
    },
    {
      matches: [
        {
          top: { seed: 5, name: 'West Virginia Runners', score: 3 },
          bottom: { seed: 3, name: 'San Francisco Porters', score: 2 },
          winner: 'top',
        },
      ],
    },
  ];

  constructor(private tournamentService: TournamentService) {}

  ngOnInit(): void {
    this.bracketData = this.generateBracketData(this.groupedMatches ?? {});
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
