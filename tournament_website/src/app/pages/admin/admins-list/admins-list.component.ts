import { Component, OnInit } from '@angular/core';
import { Admin } from '../../../models/admin.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RegisterAdminDialogComponent } from './register-admin-dialog/register-admin-dialog.component';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admins-list',
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
    MatSelectModule,
  ],
  templateUrl: './admins-list.component.html',
  styleUrl: './admins-list.component.css',
})
export class AdminsListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];

  admins: Admin[] = [
    // {
    //   username: 'Mhmd',
    //   password: 'test123',
    // },
    // {
    //   username: 'Mhmd',
    //   password: 'test123',
    // },
  ];

  constructor(private dialog: MatDialog, private adminService: AdminService) {}

  openRegisterDialog() {
    this.dialog.open(RegisterAdminDialogComponent, {
      width: '400px',
      disableClose: true,
    });
  }

  ngOnInit(): void {
    this.adminService.getAllAdmins().subscribe({
      next: (res) => {
        this.admins = res;
        console.log('Admins:', res);
      },
      error: (err) => {
        console.error('Failed to load admins:', err);
      },
    });
  }
}
