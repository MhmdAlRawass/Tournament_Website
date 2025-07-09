import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-team-details-dialog',
  imports: [FormsModule, CommonModule, MatIconModule],
  templateUrl: './team-details-dialog.component.html',
  styleUrl: './team-details-dialog.component.css',
})
export class TeamDetailsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {}

  onPressedClose() {
    this.dialog.closeAll();
  }

  onPressedDelete() {
    confirm('Are you sure you want to delete team!');
  }
}
