import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ParticipantsDialogComponent } from './participants-dialog/participants-dialog.component';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-manage-groups',
  imports: [CommonModule, MatDialogModule, DragDropModule],
  templateUrl: './manage-groups.component.html',
  styleUrl: './manage-groups.component.css',
})
export class ManageGroupsComponent {
  participants = [
    { id: 1, name: 'Player 1' },
    { id: 2, name: 'Player 2' },
    { id: 3, name: 'Player 3' },
    { id: 4, name: 'Player 4' },
    { id: 5, name: 'Player 5' },
    { id: 6, name: 'Player 6' },
    { id: 7, name: 'Player 7' },
    { id: 8, name: 'Player 8' },
    { id: 9, name: 'Player 8' },
    { id: 10, name: 'Player 8' },
    { id: 11, name: 'Player 8' },
    { id: 12, name: 'Player 8' },
    { id: 13, name: 'Player 8' },
    { id: 14, name: 'Player 8' },
    { id: 15, name: 'Player 8' },
    { id: 16, name: 'Player 8' },
  ];

  groups = [
    {
      id: 1,
      name: 'A',
      participants: [
        { id: 1, name: 'Player 1' },
        { id: 2, name: 'Player 2' },
      ],
    },
  ];

  groupCounter = 2;
  groupNameCharCode = 'A'.charCodeAt(0) + this.groups.length;

  constructor(private dialog: MatDialog) {}

  onPressedAssignParticipants(groupId: number) {
    this.dialog.open(ParticipantsDialogComponent, {
      width: '99%',
      disableClose: true,
      data: {
        groupId: groupId,
        participants: this.participants,
      },
      panelClass: 'manage-group-dialog',
    });
  }

  onPressedAddGroup() {
    const newGroup = {
      id: this.groupCounter++,
      name: String.fromCharCode(this.groupNameCharCode++),
      participants: [],
    };
    this.groups.push(newGroup);
  }

  onPressedAssignGroupsAutomatically() {
    const totalParticipants = [...this.participants];

    const shuffled = totalParticipants.sort(() => Math.random() - 0.5);

    const numberOfGroups = Math.ceil(shuffled.length / 4);

    this.groups = Array.from({ length: numberOfGroups }, (_, index) => ({
      id: index + 1,
      name: String.fromCharCode(65 + index),
      participants: [],
    }));

    shuffled.forEach((participant, i) => {
      const groupIndex = i % numberOfGroups;
      this.groups[groupIndex].participants.push(participant);
    });
  }

  onPressedDeleteGroup(groupId: number) {
    this.groups = this.groups.filter((group) => group.id !== groupId);
  }

  dropParticipant(event: CdkDragDrop<any[]>, targetGroupId: number) {
    const previousGroupId = event.previousContainer.id.replace('group-', '');
    const currentGroupId = event.container.id.replace('group-', '');

    if (previousGroupId === currentGroupId) {
      // If dropped in same group, reorder participants
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Move participant from one group to another
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  public get groupDropListIds(): string[] {
    return this.groups?.map((group: any) => 'group-' + group.id) || [];
  }
}
