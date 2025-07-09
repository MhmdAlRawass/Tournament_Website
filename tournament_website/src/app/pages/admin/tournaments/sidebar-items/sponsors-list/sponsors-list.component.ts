import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../../../services/sidebar.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddSponsorDialogComponent } from './add-sponsor-dialog/add-sponsor-dialog.component';

@Component({
  selector: 'app-sponsors-list',
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './sponsors-list.component.html',
  styleUrl: './sponsors-list.component.css',
})
export class SponsorsListComponent implements OnInit {
  constructor(private sidebar: SidebarService, private dialog: MatDialog) {}

  sponsors = [
    {
      name: 'Test',
      image: 'assets/images/image.png',
      isShown: true,
    },
    {
      name: 'Test',
      image: 'assets/images/image.png',
      isShown: true,
    },
    {
      name: 'Test',
      image: 'assets/images/image.png',
      isShown: true,
    },
    {
      name: 'Test',
      image: 'assets/images/image.png',
      isShown: true,
    },
  ];

  ngOnInit(): void {
    this.sidebar.tournamentSidebar(1);
  }

  onPressedAddSponsor() {
    this.dialog.open(AddSponsorDialogComponent, {
      width: '99%',
    });
  }
}
