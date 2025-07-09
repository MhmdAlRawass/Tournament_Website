import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-sponsor-dialog',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-sponsor-dialog.component.html',
  styleUrl: './add-sponsor-dialog.component.css',
})
export class AddSponsorDialogComponent {
  constructor(private dialog: MatDialog) {}

  onPressedClose() {
    this.dialog.closeAll();
  }
}
