import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';

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
export class RegisterTournamentComponent {
  categories = ['D', 'E'];

  formData = {
    category: '',
    phoneNumber: '',
    player1: '',
    player2: '',
  };

  onSubmit() {
    console.log('Form Data:', this.formData);
    alert('Team registered!');
  }
}
