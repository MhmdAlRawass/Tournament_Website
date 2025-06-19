import { Component, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TournamentDialogComponent } from './tournament-dialog/tournament-dialog.component';

@Component({
  selector: 'app-tournaments',
  standalone: true,
  imports: [
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    TournamentDialogComponent,
  ],
  templateUrl: './tournaments.component.html',
  styleUrl: './tournaments.component.css',
})
export class TournamentsComponent {
  displayedColumns: string[] = [
    'name',
    'groups',
    'teams',
    'category',
    'entryFee',
    'pricePool',
    'createdAt',
    'actions',
  ];

  tournaments = [
    {
      name: 'Corporate Cup 2024',
      groups: 4,
      teams: 16,
      category: 'A',
      entryFee: 10,
      pricePool: 100,
      createdAt: '2024-07-01',
    },
    {
      name: 'Winter League',
      groups: 4,
      teams: 16,
      category: 'A',
      entryFee: 10,
      pricePool: 100,
      createdAt: '2024-12-15',
    },
    {
      name: 'Spring Games',
      groups: 4,
      teams: 16,
      category: 'A',
      entryFee: 10,
      pricePool: 100,
      createdAt: '2025-03-20',
    },
  ];

  @ViewChild(TournamentDialogComponent) dialog!: TournamentDialogComponent;

  
  openAddDialog() {
    this.dialog.open();
  }

  onDialogClosed(result: any) {
    if (!result) return;

    const existing = this.tournaments.find((t) => t.name === result.name);
    if (existing) {
      Object.assign(existing, result);
    } else {
      this.tournaments.push(result);
    }
  }

  editTournament(element: any) {
    this.dialog.open(element);
  }

  deleteTournament(element: any) {
    // delete logic
  }
}
