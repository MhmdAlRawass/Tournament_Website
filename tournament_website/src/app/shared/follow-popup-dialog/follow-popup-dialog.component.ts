import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-follow-popup-dialog',
  standalone: true,
  imports: [MatDialogModule, CommonModule],
  templateUrl: './follow-popup-dialog.component.html',
  styleUrls: ['./follow-popup-dialog.component.css'],
})
export class FollowPopupDialogComponent {
  isClosing = false;

  constructor(private dialog: MatDialog) {}

  onPressedClose() {
    this.isClosing = true;
    setTimeout(() => this.dialog.closeAll(), 400);
  }

  onFollow() {
    window.open(
      'https://www.instagram.com/padelhivelb?igsh=MXVwMDFhNThza3NxaQ==',
      '_blank'
    );
    this.onPressedClose();
  }
}
