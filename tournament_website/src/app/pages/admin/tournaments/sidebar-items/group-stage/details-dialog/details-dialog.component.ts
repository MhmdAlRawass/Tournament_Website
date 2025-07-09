import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-details-dialog',
  imports: [MatDialogModule, CommonModule],
  templateUrl: './details-dialog.component.html',
  styleUrl: './details-dialog.component.css',
})
export class DetailsDialogComponent {


  tabs: ('match' | 'report')[] = ['match', 'report'];
  selectedTab: 'match' | 'report' = 'match';

  matchView: 'default' | 'setTime' = 'default';
  isMatchPlayed: boolean = false;

  constructor(private dialog: MatDialog){}

  onPressedChangeTab(tab: 'match' | 'report') {
    this.selectedTab = tab;
  }

  onPressedSetTime() {
    this.matchView = 'setTime';
  }

  onPressedCancelSetTime() {
    this.matchView = 'default';
  }

  onPressedClose() {
    this.dialog.closeAll();
  }

  getTabTitle(tab: 'match' | 'report') {
    return tab === 'match' ? 'Match details' : 'Report scores';
  }

  onConfirmSetTime() {}
}
