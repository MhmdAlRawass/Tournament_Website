declare var gtag: Function;

import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
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
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
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

  districts = [
    'مجلس مفوضية الجنوب',
    'فوج صيدا الأول',
    'فوج صيدا الرابع',
    'فوج صيدا الخامس',
    'فوج صيدا السادس',
    'فوج حاصبيا الأول',
    'الفرقة الموسيقية لمفوضية الجنوب',
    'الهيئة العامة',
    'الهيئة الإدارية',
    'المفوضية العامة',
    'مجلس مفوضية بيروت',
    'مجلس مفوضية الجبل',
    'مجلس مفوضية البقاع',
    'فوج بيروت الأول',
    'فوج بيروت الثاني',
    'فوج بيروت الثالث',
    'فوج بيروت الرابع',
    'فوج بيروت السابع',
    'الفرقة الموسيقية لمفوضية بيروت',
    'فوج برمانا الأول',
    'فوج الرابية الأول',
    'فوج عاليه الأول',
    'فوج المنصف الأول',
    'فوج زحلة الأول',
    'فوج زحلة الثاني',
    'فوج زحلة الثالث',
    'فوج زحلة الرابع',
    'الفرقة الموسيقية لمفوضية البقاع',
  ];

  formData: ParticipantDb = {
    team_name: null,
    district: '',
    category: '',
    phone_number: null,
    player1_name: '',
    player2_name: '',
  };

  isLoading = false;
  isFormSubmitted = false;

  constructor(
    private participantServices: ParticipantService,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(form: NgForm) {
    this.isFormSubmitted = true;

    if (form.invalid) {
      Object.values(form.controls).forEach((control) =>
        control.markAsTouched()
      );
      this.snackBar.open('Required info must be filled!', 'Close', {
        duration: 3000,
      });
      return;
    }
    gtag('event', 'form_submit', {
      event_category: 'forms',
      event_label: 'Tournament Registration',
    });

    this.isLoading = true;

    this.participantServices.addParticipant(this.formData).subscribe({
      next: () => {
        this.isLoading = false;
        this.snackBar.open('Team Registered Successfully!', 'Close', {
          duration: 3000,
        });
        this.formData = {
          team_name: null,
          district: '',
          category: '',
          phone_number: null,
          player1_name: '',
          player2_name: '',
        };
        this.isFormSubmitted = false;
        // form.resetForm();
      },
      error: (err) => {
        console.error('Error adding participant:', err);
        this.isLoading = false;
        this.snackBar.open('An Error Occurred', 'Close', {
          duration: 3000,
        });
      },
    });
  }

  
}
