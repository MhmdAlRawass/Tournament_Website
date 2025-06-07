import { AfterViewInit, Component, Input } from '@angular/core';
import { Match } from '../../../../models/match.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tournament-detail-bracket',
  imports: [CommonModule],
  templateUrl: './tournament-detail-bracket.component.html',
  styleUrl: './tournament-detail-bracket.component.css',
})
export class TournamentDetailBracketComponent {
  @Input() tournament: any;

  rounds: Match[][] = [
    [
      // Round 1
      { team1: 'Abdul Dowdy', score1: 1, team2: 'Alva Allred', score2: 3 },
      { team1: 'Bill Lackey', score1: 1, team2: 'Sue Plante', score2: 3 },
      { team1: 'Abdul Dowdy', score1: 1, team2: 'Mittie Abrams', score2: 3 },
      { team1: 'Adela Peters', score1: 1, team2: 'Owen Boone', score2: 3 },
    ],
    [
      // Round 2
      { team1: 'Abdul Dowdy', score1: 1, team2: 'Alva Allred', score2: 3 },
      { team1: 'Abdul Dowdy', score1: 1, team2: 'Alva Allred', score2: 3 },
    ],
    [
      // Final
      { team1: 'Abdul Dowdy', score1: 1, team2: 'Alva Allred', score2: 3 },
    ],
  ];
  connectorHeight = 100; // consistent height for SVG

  generateConnectorPath(matchIndex: number): string {
    // Draw a curve from current match to approx center of next
    const y = 50 + (matchIndex % 2 === 1 ? 30 : -30);
    return `M0 50 C 40 50, 60 ${y}, 100 ${y}`;
  }
}
