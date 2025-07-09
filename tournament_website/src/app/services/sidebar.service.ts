import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface SidebarItem {
  label: string;
  icon: string;
  route?: string;
  exact?: boolean;
  children?: SidebarItem[];
  expanded?: boolean;
}

export interface SidebarData {
  logo: string;
  title: string;
  subtitle: string;
  isTournament?: boolean;
  list: SidebarItem[];
}

@Injectable({ providedIn: 'root' })
export class SidebarService {
  _items = new BehaviorSubject<SidebarData>({
    logo: 'assets/images/image.png',
    title: 'Padel Square',
    subtitle: 'Platform: PadelHive',
    list: [],
  });
  items$ = this._items.asObservable();

  setItems(items: SidebarData) {
    this._items.next(items);
  }

  resetToDefault() {
    this.setItems({
      logo: 'assets/images/image.png',
      title: 'Padel Square',
      subtitle: 'Platform: PadelHive',
      list: [
        {
          label: 'Dashboard',
          icon: 'dashboard',
          route: '/admin/dashboard',
          exact: true,
        },
        // {
        //   label: 'Tournaments',
        //   icon: 'emoji_events',
        //   route: '/admin/tournaments',
        //   exact: true,
        // },
        {
          label: 'Tournaments',
          icon: 'emoji_events',
          route: '/admin/tournaments',
          exact: true,
        },
      ],
    });
  }

  tournamentSidebar(id: number) {
    this.setItems({
      isTournament: true,
      logo: 'assets/images/image.png',
      title: `Tournament #${id}`,
      subtitle: 'Management',
      list: [
      {
        label: 'Overview',
        icon: 'home', //
        route: `/admin/tournament/${id}`,
        exact: true,
      },
      {
        label: 'Participants',
        icon: 'group',
        route: `/admin/tournament/${id}/participants`,
        exact: true,
      },
      {
        label: 'Payments',
        icon: 'credit_card',
        route: `/admin/tournament/${id}/payment-management`,
        exact: true,
      },
      {
        label: 'Stages',
        icon: 'layers',
        children: [
        {
          label: 'Group Stage',
          icon: 'groups',
          route: `/admin/tournament/${id}/groups`,
          exact: true,
        },
        {
          label: 'Final Stage',
          icon: 'emoji_events',
          route: `/admin/tournament/${id}/final`,
          exact: true,
        },
        ],
      },{
        label: 'Sponsors',
        icon: 'redeem',
        route: `/admin/tournament/${id}/sponsors`,
        exact: true,
      },
      ],
    });
  }
}
