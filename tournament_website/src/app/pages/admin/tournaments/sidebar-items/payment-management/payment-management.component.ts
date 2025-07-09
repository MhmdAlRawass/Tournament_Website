import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ParticipantDetailDialogComponent } from './participant-details-dialog/participant-detail-dialog.component';
import { SidebarService } from '../../../../../services/sidebar.service';

@Component({
  selector: 'app-payment-management',
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './payment-management.component.html',
  styleUrl: './payment-management.component.css',
})
export class PaymentManagementComponent implements OnInit {
  participants: any[] = [];
  filteredParticipants: any[] = [];
  currentParticipantId: number | null = null;

  // filtering
  searchTerm: string = '';
  private searchInput$ = new Subject<string>();
  selectedStatusFilter = 'all';
  categoryFilter: string = 'all';

  // pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;
  pagedParticipants: any[] = [];

  constructor(
    private dialog: MatDialog,
    private sidebarService: SidebarService
  ) {
    this.sidebarService.tournamentSidebar(12312);
  }

  ngOnInit() {
    this.searchInput$.pipe(debounceTime(1000)).subscribe((term) => {
      this.performSearch(term);
    });
    this.loadData();
    this.updateDashboard();
    this.applyFilters();
  }

  loadData() {
    // this.userService.getAllUsers().subscribe({
    //   next: (res) => {
    //     this.participants = res;
    //   },
    //   error: (err) => {
    //     console.error(`Error occured ${err}`);
    //   },
    // });
    this.participants = [
      {
        id: 1,
        player1: 'Abedelhaleem Dimassi',
        player2: 'Omar antar',
        category: 'D',
        phone: '76747087',
        team: 'AO',
        status: 'paid',
        amount: 300,
        paidDate: '2025-06-20',
        dueDate: '2025-06-30',
      },
      {
        id: 2,
        player1: 'Mhmd Abedlhameed',
        player2: 'Hamza Tahhan',
        category: 'D',
        phone: '71265884',
        team: 'No Team Name',
        status: 'pending',
        amount: 300,
        dueDate: '2025-06-30',
      },
      {
        id: 3,
        player1: 'Hassouna',
        player2: 'Hasan Arnaout',
        category: 'E',
        phone: '0',
        team: 'No Team Name',
        status: 'overdue',
        amount: 300,
        dueDate: '2025-06-20',
      },
      {
        id: 4,
        player1: 'Donia Merie',
        player2: 'Imad El Sayad',
        category: 'E',
        phone: '76013002',
        team: 'Dodo Akadodo',
        status: 'paid',
        amount: 300,
        paidDate: '2025-06-22',
        dueDate: '2025-06-30',
      },
      {
        id: 5,
        player1: 'Kayed Miari',
        player2: 'Firas Darwich',
        category: 'D',
        phone: '70887805',
        team: 'No Team Name',
        status: 'paid',
        amount: 300,
        paidDate: '2025-06-21',
        dueDate: '2025-06-30',
      },
      {
        id: 6,
        player1: 'Raed Miari',
        player2: 'Rayyan bawab',
        category: 'E',
        phone: '81082437',
        team: 'خليها على الله',
        status: 'paid',
        amount: 300,
        paidDate: '2025-06-23',
        dueDate: '2025-06-30',
      },
      {
        id: 7,
        player1: 'Mohammad Shehade',
        player2: 'Mohammad Jradi',
        category: 'E',
        phone: '70774472',
        team: 'No Team Name',
        status: 'pending',
        amount: 300,
        dueDate: '2025-06-30',
      },
      {
        id: 8,
        player1: 'Ahmad akra',
        player2: 'Bassem abdel jawad',
        category: 'D',
        phone: '71176363',
        team: 'No Team Name',
        status: 'paid',
        amount: 300,
        paidDate: '2025-06-19',
        dueDate: '2025-06-30',
      },
      {
        id: 9,
        player1: 'Manal Barakat',
        player2: 'Sara Issa',
        category: 'E',
        phone: '70869973',
        team: 'فريق حيبا الشمس',
        status: 'paid',
        amount: 300,
        paidDate: '2025-06-24',
        dueDate: '2025-06-30',
      },
      {
        id: 10,
        player1: 'Raed Bsat',
        player2: 'Ahmad Kayello',
        category: 'D',
        phone: '70934103',
        team: 'يا سهيل',
        status: 'overdue',
        amount: 300,
        dueDate: '2025-06-18',
      },
      {
        id: 11,
        player1: 'John Doe',
        player2: 'Jane Smith',
        category: 'D',
        phone: '70123456',
        team: 'Team Alpha',
        status: 'paid',
        amount: 300,
        paidDate: '2025-06-25',
        dueDate: '2025-06-30',
      },
      {
        id: 12,
        player1: 'Mike Johnson',
        player2: 'Sarah Wilson',
        category: 'E',
        phone: '71234567',
        team: 'Team Beta',
        status: 'paid',
        amount: 300,
        paidDate: '2025-06-24',
        dueDate: '2025-06-30',
      },
      {
        id: 13,
        player1: 'David Brown',
        player2: 'Lisa Davis',
        category: 'E',
        phone: '72345678',
        team: 'Team Gamma',
        status: 'pending',
        amount: 300,
        dueDate: '2025-06-30',
      },
    ];
    this.applyFilters();
  }

  get totalRevenue(): number {
    return this.participants
      .filter((p) => p.has_paid)
      .reduce((sum, p) => sum + p.amount, 0);
  }

  get paidCount(): number {
    return this.participants.filter((p) => p.has_paid).length;
  }

  get pendingCount(): number {
    return this.participants.filter((p) => !p.has_paid).length;
  }

  // get overdueCount(): number {
  //   return this.participants.filter((p) => this.isOverdue(p)).length;
  // }

  // isOverdue(p: UserDb): boolean {
  //   if (p.has_paid || !p.dueDate) return false;
  //   return new Date(p.dueDate) < new Date();
  // }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  applyFilters() {
    const term = this.searchTerm?.toLowerCase() || '';

    this.filteredParticipants = this.participants.filter((p) => {
      const matchesStatus =
        this.selectedStatusFilter === 'all' ||
        (this.selectedStatusFilter === 'paid' && p.status === 'paid') ||
        (this.selectedStatusFilter === 'pending' && p.status === 'pending') ||
        (this.selectedStatusFilter === 'overdue' && p.status === 'overdue');

      const matchesCategory =
        this.categoryFilter === 'all' || p.category === this.categoryFilter;

      const matchesSearch =
        (p.player1?.toLowerCase().includes(term) ?? false) ||
        (p.phone?.toString().includes(term) ?? false);

      return matchesStatus && matchesCategory && matchesSearch;
    });

    this.totalPages = Math.ceil(
      this.filteredParticipants.length / this.itemsPerPage
    );

    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedParticipants = this.filteredParticipants.slice(
      startIndex,
      endIndex
    );
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.applyFilters();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyFilters();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.applyFilters();
    }
  }

  getPageEnd() {
    return Math.min(
      this.currentPage * this.itemsPerPage,
      this.filteredParticipants.length
    );
  }

  markAsPaid(participantId: number) {
    const participant = this.participants.find((p) => p.id === participantId);
    if (!participant) return;

    participant.status = 'paid';
    participant.paidDate = new Date().toISOString().split('T')[0];
    this.applyFilters();
  }

  markAsUnPaid(participantId: number) {
    const participant = this.participants.find((p) => p.id === participantId);
    if (!participant) return;
    if (!confirm('Are you sure you wanna mark participant as unpaid')) {
      return;
    }
    participant.status = 'pending';
    this.applyFilters();
  }

  sendReminder(participantId: number) {
    const participant = this.participants.find((p) => p.id === participantId);
    if (!participant) return;

    alert(
      `Reminder sent to ${participant.player_name} (${participant.phone_number})`
    );
  }

  viewDetails(participantId: number) {
    const p = this.participants.find((p) => p.id === participantId);
    if (!p) return;

    this.dialog.open(ParticipantDetailDialogComponent, {
      width: '400px',
      data: p,
    });
  }

  onSearchInput(value: string): void {
    this.searchInput$.next(value);
  }

  performSearch(term: string): void {
    this.searchTerm = term;
    this.applyFilters();
  }

  onStatusFilterChange(newStatus: string) {
    this.selectedStatusFilter = newStatus;
    this.applyFilters();
  }

  onCategoryChange(value: string) {
    this.categoryFilter = value;
    this.applyFilters();
  }

  updateDashboard() {}
}
