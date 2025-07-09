import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tournament-dialog',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './tournament-dialog.component.html',
  styleUrl: './tournament-dialog.component.css',
})
export class TournamentDialogComponent {
  isEdit = false;

  tournament = {
    name: '',
    category: '',
    entryFee: null,
    prizePool: null,
    teams: [] as { member1: string; member2: string }[],
  };

  categories = ['A', 'B', 'C'];

  constructor(
    private dialogRef: MatDialogRef<TournamentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = !!data;

    if (data) {
      this.tournament = {
        name: data.name || '',
        category: data.category || '',
        entryFee: data.entryFee || null,
        prizePool: data.pricePool || null,
        teams: data.teams || [],
      };
    }
  }

  cancel() {
    this.dialogRef.close(null);
  }

  submit() {
    if (!this.tournament.name || !this.tournament.category) return;
    this.dialogRef.close(this.tournament);
  }

  addTeam() {
    this.tournament.teams.push({ member1: '', member2: '' });
  }

  removeTeam(index: number) {
    this.tournament.teams.splice(index, 1);
  }
}
