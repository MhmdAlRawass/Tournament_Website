import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-participant-dialog',
  imports: [CommonModule, FormsModule],
  templateUrl: './register-participant-dialog.component.html',
  styleUrl: './register-participant-dialog.component.css',
})
export class RegisterParticipantDialogComponent {
  categories = ['D', 'E'];
  districts = ['District A', 'District B', 'District C'];

  constructor(private dialog: MatDialog) {}

  onPressedClose() {
    this.dialog.closeAll();
  }
}
