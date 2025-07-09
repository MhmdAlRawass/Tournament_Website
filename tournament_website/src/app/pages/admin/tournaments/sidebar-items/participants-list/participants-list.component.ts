import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TeamDetailsDialogComponent } from './team-details-dialog/team-details-dialog.component';
import { RegisterParticipantDialogComponent } from './register-participant-dialog/register-participant-dialog.component';
import {
  ParticipantDb,
  ParticipantService,
} from '../../../../../services/participant.service';
import { SidebarService } from '../../../../../services/sidebar.service';
import { ManageGroupsComponent } from './manage-groups/manage-groups.component';

@Component({
  selector: 'app-participants-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    ManageGroupsComponent,
  ],
  templateUrl: './participants-list.component.html',
  styleUrls: ['./participants-list.component.css'],
})
export class ParticipantsListComponent implements OnInit {
  chosenTab: 'participants' | 'groups' = 'participants';

  searchQuery: string = '';
  selectedDistrict: string = '';
  categoryList: string[] = ['D', 'E'];
  selectedCategory: string = '';
  filteredParticipants: ParticipantDb[] = [];

  districtsList: string[] = [];
  participants: ParticipantDb[] = [];

  editingParticipantId: number | null = null;
  editFormData: Partial<ParticipantDb> = {};

  isLoadingList = false;
  isSaving = false;
  deletingParticipantId: number | null = null;

  // pagination
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;
  paginatedParticipants: ParticipantDb[] = [];

  constructor(
    private participantService: ParticipantService,
    private dialog: MatDialog,
    private sidebarService: SidebarService
  ) {
    this.sidebarService.tournamentSidebar(12312);
  }

  ngOnInit(): void {
    this.isLoadingList = true;
    this.participantService.getAllParticipants().subscribe({
      next: (data: ParticipantDb[]) => {
        this.participants = data
          .map((p) => ({
            id: p.id,
            player1_name: p.player1_name,
            player2_name: p.player2_name,
            category: p.category,
            phone_number: p.phone_number,
            team_name: p.team_name === null ? 'No Team Name' : p.team_name,
            district: !p.district ? 'No District' : p.district,
            created_at: p.created_at ?? 'Unknown',
            comment: p.comment ?? 'No Comment',
          }))
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );

        this.applyFilters();

        this.districtsList = [
          ...new Set(this.participants.map((p) => p.district)),
        ];

        this.isLoadingList = false;
      },
      error: (err) => {
        console.error('Error loading participants:', err);
        this.isLoadingList = false;
      },
    });
  }

  applyFilters(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredParticipants = this.participants.filter((p) => {
      const matchesSearch =
        p.player1_name.toLowerCase().includes(query) ||
        p.player2_name.toLowerCase().includes(query) ||
        p.team_name.toLowerCase().includes(query);

      return matchesSearch;
    });

    this.paginateData();
  }

  getCategoryCount(cat: string): number {
    return this.participants.filter((p) => p.category === cat).length;
  }

  getTeamCount(): number {
    return this.participants.filter(
      (p) => p.team_name && p.team_name !== 'No Team Name'
    ).length;
  }

  // Start editing - populate form data for the selected participant
  editParticipant(participant: ParticipantDb) {
    this.editingParticipantId = participant.id ?? null;
    this.editFormData = { ...participant }; // shallow copy
  }

  // Save the changes
  saveParticipant() {
    if (this.editingParticipantId === null) return;

    this.isSaving = true;

    const { id, created_at, ...rest } = this.editFormData;
    const participantToUpdate: Omit<ParticipantDb, 'id' | 'created_at'> = {
      player1_name: rest.player1_name ?? '',
      player2_name: rest.player2_name ?? '',
      category: rest.category ?? '',
      phone_number: rest.phone_number ?? null,
      team_name: rest.team_name ?? '',
      district: rest.district ?? '',
      comment: rest.comment ?? '',
    };

    this.participantService
      .updateParticipant(this.editingParticipantId, participantToUpdate)
      .subscribe({
        next: (updatedParticipant) => {
          const index = this.participants.findIndex(
            (p) => p.id === updatedParticipant.id
          );
          if (index !== -1) {
            this.participants[index] = updatedParticipant;
            this.applyFilters();
          }
          this.isSaving = false;
          this.cancelEdit();
        },
        error: (err) => {
          console.error('Update failed', err);
          this.isSaving = false;
        },
      });
  }

  // Cancel editing
  cancelEdit() {
    this.editingParticipantId = null;
    this.editFormData = {};
  }

  deleteParticipant(id: number) {
    this.deletingParticipantId = id;
    if (!confirm('Are you sure you want to delete this participant?')) {
      this.deletingParticipantId = null;
      return;
    }
    this.participantService.deleteParticipant(id).subscribe({
      next: () => {
        this.participants = this.participants.filter((p) => p.id !== id);
        this.applyFilters();
        this.deletingParticipantId = null;
      },
      error: (err) => {
        console.error('Delete failed', err);
        this.deletingParticipantId = null;
      },
    });
  }

  onPressedAddTeam() {
    this.dialog.open(RegisterParticipantDialogComponent, {
      width: '99%',
      disableClose: true,
    });
  }

  onPressedDetails(p: any) {}

  onPressedEdit(p: any) {
    this.dialog.open(TeamDetailsDialogComponent, {
      width: '99%',
      disableClose: true,
      data: p,
    });
  }

  onPressedTab(tab: 'participants' | 'groups') {
    this.chosenTab = tab;
  }

  onSearchChange(term: string) {
    this.searchQuery = term;
    this.applyFilters();
  }

  onPressedCSV() {
    if (!this.participants || this.participants.length === 0) {
      console.warn(`No data to export`);
      return;
    }

    const replacer = (key: string, value: any) => value ?? '';
    const header = [
      'id',
      'team_name',
      'district',
      'player1_name',
      'player2_name',
      'phone_number',
      'category',
      'comment',
      'created_at',
    ];

    const csvRows = [
      header.join(','), // Header row
      ...this.participants.map((participant) =>
        header
          .map((field) =>
            JSON.stringify(participant[field as keyof ParticipantDb], replacer)
          )
          .join(',')
      ),
    ];

    const csvContent = csvRows.join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'participants.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  paginateData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedParticipants = this.filteredParticipants.slice(
      startIndex,
      endIndex
    );

    this.totalItems = this.filteredParticipants.length;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  }

  getMath() {
    return Math.min(this.currentPage * this.pageSize, this.totalItems);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateData();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateData();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.paginateData();
  }
}
