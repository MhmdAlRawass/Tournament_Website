import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-participants-dialog',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './participants-dialog.component.html',
  styleUrl: './participants-dialog.component.css',
})
export class ParticipantsDialogComponent implements OnInit {
  groupId: number;
  participants: any[];

  constructor(
    private dialogRef: MatDialogRef<ParticipantsDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { groupId: number; participants: any[] }
  ) {
    this.groupId = data.groupId;
    this.participants = data.participants;
  }

  ngOnInit(): void {}

  closeDialog() {
    this.dialogRef.close();
  }
}
