import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';

@Component({
  selector: 'app-bracket',
  imports: [CommonModule, MatDialogModule],
  standalone: true,
  templateUrl: './bracket.component.html',
  styleUrl: './bracket.component.css',
})
export class BracketComponent {
  constructor(private dialog: MatDialog) {}

  onPressedDetails() {
    this.dialog.open(DetailsDialogComponent, {
      width: '99%',
    });
  }
}
