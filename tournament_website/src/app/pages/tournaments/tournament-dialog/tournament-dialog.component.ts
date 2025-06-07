import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
// import {
//   MatDialogActions,
//   MatDialogContent,
//   MatDialogRef,
// } from '@angular/material/dialog';
// import { MatFormField, MatLabel } from '@angular/material/form-field';
// import { MatIcon } from '@angular/material/icon';
// import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-tournament-dialog',
  imports: [
    FormsModule,
    CommonModule,
    // MatDialogContent,
    // MatFormField,
    // MatLabel,
    // MatSelect,
    // MatOption,
    // MatIcon,
    // MatDialogActions,
    ReactiveFormsModule,
  ],
  templateUrl: './tournament-dialog.component.html',
  styleUrl: './tournament-dialog.component.css',
})
export class TournamentDialogComponent {
  isOpen = false;
  isEdit = false;

  tournament = {
    name: '',
    category: '',
    entryFee: null,
    prizePool: null,
    teams: [] as { member1: string; member2: string }[],
  };

  categories = ['A', 'B', 'C'];

  constructor() {}

  test() {}

  @Output() closed = new EventEmitter<any>();

  open(data?: any) {
    this.isEdit = !!data;
    this.isOpen = true;

    if (data) {
      this.tournament = {
        name: data.name || '',
        category: data.category || '',
        entryFee: data.entryFee || null,
        prizePool: data.pricePool || null,
        teams: [],
      };
    } else {
      this.tournament = {
        name: '',
        category: '',
        entryFee: null,
        prizePool: null,
        teams: [],
      };
    }
  }

  cancel() {
    this.isOpen = false;
    this.closed.emit(null);
  }

  submit() {
    if (!this.tournament.name || !this.tournament.category) return;
    this.isOpen = false;
    this.closed.emit(this.tournament);
  }

  addTeam() {
    this.tournament.teams.push({ member1: '', member2: '' });
  }

  removeTeam(index: number) {
    this.tournament.teams.splice(index, 1);
  }
}
