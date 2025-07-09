import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DetailsDialogComponent } from '../../group-stage/details-dialog/details-dialog.component';

@Component({
  selector: 'app-final-stage-bracket',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './final-stage-bracket.component.html',
  styleUrl: './final-stage-bracket.component.css',
})
export class FinalStageBracketComponent {
  isFullScreen = false;
  rounds = ['16 teams', 'Quarter Finals', 'Semi-Finals', 'Finals'];
  bracketData = [
    // Round 1 (16 teams → 8 winners)
    {
      matches: [
        {
          top: { seed: 1, name: 'New York Knights', score: 2 },
          bottom: { seed: 16, name: 'Tampa Thunder', score: 0 },
          winner: 'top',
        },
        {
          top: { seed: 8, name: 'Phoenix Falcons', score: 1 },
          bottom: { seed: 9, name: 'Orlando Sharks', score: 2 },
          winner: 'bottom',
        },
        {
          top: { seed: 5, name: 'Boston Brawlers', score: 2 },
          bottom: { seed: 12, name: 'Charlotte Crushers', score: 0 },
          winner: 'top',
        },
        {
          top: { seed: 4, name: 'Los Angeles Legends', score: 2 },
          bottom: { seed: 13, name: 'Detroit Hawks', score: 1 },
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

    // Round 2: Quarterfinals (8 teams → 4 winners)
    {
      matches: [
        {
          top: { seed: 1, name: 'New York Knights', score: 2 },
          bottom: { seed: 9, name: 'Orlando Sharks', score: 1 },
          winner: 'top',
        },
        {
          top: { seed: 5, name: 'Boston Brawlers', score: 0 },
          bottom: { seed: 4, name: 'Los Angeles Legends', score: 2 },
          winner: 'bottom',
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

    // Round 3: Semifinals (4 teams → 2 winners)
    {
      matches: [
        {
          top: { seed: 1, name: 'New York Knights', score: 2 },
          bottom: { seed: 4, name: 'Los Angeles Legends', score: 0 },
          winner: 'top',
        },
        {
          top: { seed: 3, name: 'San Francisco Porters', score: 2 },
          bottom: { seed: 2, name: 'Denver Demon Horses', score: 1 },
          winner: 'top',
        },
      ],
    },

    // Final: Championship (2 teams → 1 winner)
    {
      matches: [
        {
          top: { seed: 1, name: 'New York Knights', score: 1 },
          bottom: { seed: 3, name: 'San Francisco Porters', score: 2 },
          winner: 'bottom',
        },
      ],
    },
  ];

  constructor(private dialog: MatDialog) {}

  isScoreNaN(score: number): boolean {
    return isNaN(score);
  }

  onPressedDetails() {
    this.dialog.open(DetailsDialogComponent, {
      width: '99%',
    });
  }
}
