import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatListModule, RouterModule, MatIconModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  appName: string = 'Tournament Website';

  navItems = [
    // {
    //   label: 'Dashboard',
    //   icon: 'dashboard',
    //   route: '/admin/dashboard',
    //   exact: true,
    // },
    // {
    //   label: 'Tournaments',
    //   icon: 'emoji_events',
    //   route: '/admin/tournaments',
    //   exact: true,
    // },
    {
      label: 'Participants',
      icon: 'people',
      route: '/admin/participants',
      exact: true,
    },
    {
      label: 'Admins',
      icon: 'people',
      route: '/admin/admins',
      exact: true,
    },
  ];
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  onLogout() {
    this.authService.logout();
    this.snackBar.open('Logged out successfully', 'Close', { duration: 3000 });
    this.router.navigate(['/admin-login']);
  }
}
