import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import {
  ParticipantDb,
  ParticipantService,
} from '../../services/participant.service';

declare var tsParticles: any;

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
  ],
  templateUrl: './register-tournament.component.html',
  styleUrls: ['./register-tournament.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterTournamentComponent implements OnInit {
  categories = ['D', 'E'];

  formData: ParticipantDb = {
    category: '',
    phoneNumber: '',
    player1: '',
    player2: '',
  };

  constructor(private participantServices: ParticipantService) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.values(form.controls).forEach((control) => {
        control.markAsTouched();
      });
      alert('All Info must be filled');
      return;
    }

    this.participantServices.addParticipant(this.formData).subscribe({
      next: (res) => {
        console.log('Participant added ');
        alert('Team Registered Successfully!');
        this.formData = {
          category: '',
          phoneNumber: '',
          player1: '',
          player2: '',
        };
      },
      error: (err) => {
        console.error('Error adding participant:', err);
        alert('Failed to register team.');
      },
    });
  }

  ngOnInit(): void {
    // tsParticles.load('tsparticles', {
    //   background: { color: 'transparent' },
    //   fullScreen: { enable: false },
    //   particles: {
    //     number: { value: 12, density: { enable: true, area: 800 } },
    //     move: {
    //       direction: 'none',
    //       enable: true,
    //       outModes: 'bounce',
    //       random: true,
    //       speed: 1,
    //       straight: false,
    //     },
    //     shape: {
    //       type: 'image',
    //       image: {
    //         src: 'https://cdn-icons-png.flaticon.com/512/1048/1048314.png',
    //         width: 30,
    //         height: 30,
    //       },
    //     },
    //     size: { value: 20, random: { enable: true, minimumValue: 14 } },
    //     opacity: { value: 0.8 },
    //   },
    //   detectRetina: true,
    // });
  }
}
