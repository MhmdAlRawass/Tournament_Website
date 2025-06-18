import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  ParticipantDb,
  ParticipantService,
} from '../../services/participant.service';

@Component({
  selector: 'app-register-tournament',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    MatToolbarModule,
    MatRadioModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './register-tournament.component.html',
  styleUrls: ['./register-tournament.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterTournamentComponent {
  categories = ['D', 'E'];

  formData: ParticipantDb = {
    category: '',
    phoneNumber: '',
    player1: '',
    player2: '',
  };

  isLoading: boolean = false;

  constructor(
    private participantServices: ParticipantService,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.values(form.controls).forEach((control) => {
        control.markAsTouched();
      });
      this.snackBar.open('All info must be filled!', 'Close', {
        duration: 3000,
      });
      return;
    }

    this.isLoading = true;

    this.participantServices.addParticipant(this.formData).subscribe({
      next: (res) => {
        console.log('Participant added ');
        this.isLoading = false;
        this.snackBar.open('Team Registered Successfully!', 'Close', {
          duration: 3000,
        });
        this.formData = {
          category: '',
          phoneNumber: '',
          player1: '',
          player2: '',
        };
      },
      error: (err) => {
        console.error('Error adding participant:', err);
        this.isLoading = false;
        this.snackBar.open('An Error Occured', 'Close', {
          duration: 3000,
        });
      },
    });
  }
}
