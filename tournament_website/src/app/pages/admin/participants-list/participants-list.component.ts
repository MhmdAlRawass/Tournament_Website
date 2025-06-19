import { Component, OnInit } from '@angular/core';
import { ParticipantDb, ParticipantService } from '../../../services/participant.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-participants-list',
  standalone: true,  
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './participants-list.component.html',
  styleUrls: ['./participants-list.component.css'],
})
export class ParticipantsListComponent implements OnInit {
  displayedColumns: string[] = [
    'player1_name',
    'player2_name',
    'category',
    'phone_number',
    'created_at',
  ];

  participants: ParticipantDb[] = [];

  constructor(private participantService: ParticipantService) {}

  ngOnInit(): void {
    this.participantService.getAllParticipants().subscribe({
      next: (data: ParticipantDb[]) => {
        this.participants = data.map((p) => ({
          player1_name: p.player1_name,
          player2_name: p.player2_name,
          category: p.category,
          phone_number: p.phone_number,
          created_at: p.created_at ?? 'Unknown',
        }));
        console.log('Loaded participants:', this.participants);
      },
      error: (err) => {
        console.error('An error occurred while loading participants:', err);
      },
    });
  }
}
