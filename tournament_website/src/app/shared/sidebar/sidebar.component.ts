import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  SidebarData,
  SidebarItem,
  SidebarService,
} from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatListModule, RouterModule, MatIconModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnDestroy {
  appName: string = 'Tournament Website';

  sidebarData: SidebarData = {
    logo: '',
    title: '',
    subtitle: '',
    list: [],
  };

  private subscription: PushSubscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private sidebarService: SidebarService
  ) {
    this.sidebarService.items$.subscribe((items) => {
      this.sidebarData = items;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleDropdown(item: SidebarItem) {
    item.expanded = !item.expanded;
  }

  // backward to touranments
  goBack() {
    this.router.navigate(['/admin/tournaments'])
  }

  onLogout() {
    this.authService.logout();
    this.snackBar.open('Logged out successfully', 'Close', { duration: 3000 });
    this.router.navigate(['/admin-login']);
  }
}
