import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-participant-detail-dialog',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './participant-detail-dialog.component.html',
  styleUrl: './participant-detail-dialog.component.css',
})
export class ParticipantDetailDialogComponent {
  paymentData = {
    name: 'Mhmd',
    amount: 300,
    paymentMethod: 'cash',
    paymentDate: '',
    notes: '',
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {}

  closeDialog() {
    this.dialog.closeAll();
  }

  submitPayment(form: NgForm) {
    if (form.valid) {
      console.log('Payment recorded:', this.paymentData);
      // Submit logic here
    }
  }
}
