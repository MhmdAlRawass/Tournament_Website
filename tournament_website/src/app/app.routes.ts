import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { TournamentsComponent } from './pages/tournaments/tournaments.component';
import { HomeComponent } from './pages/home/home.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { TournamentDetailComponent } from './pages/tournament-detail/tournament-detail.component';
import { TournamentFullBracketComponent } from './pages/tournament-detail/tournament-full-bracket/tournament-full-bracket.component';
import { RegisterTournamentComponent } from './pages/register-tournament/register-tournament.component';
import { AdminLoginComponent } from './pages/admin/admin-login/admin-login.component';
import { AdminGuard } from './pages/admin/guards/admin.guard';

export const routes: Routes = [
  // public routes
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'tournament/register', component: RegisterTournamentComponent },
      { path: 'tournament/:id', component: TournamentDetailComponent },
      {
        path: 'tournament/:id/bracket-view',
        component: TournamentFullBracketComponent,
      },
    ],
  },
  // admin login
  { path: 'admin-login', component: AdminLoginComponent },
  // admin routes
  {
    path: 'admin',
    component: AdminLayoutComponent,
    // canActivate: [AdminGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'tournaments', component: TournamentsComponent },
    ],
  },
];
