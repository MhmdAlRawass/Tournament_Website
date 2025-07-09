import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  // constructor(private dialog: MatDialog, private overlay: Overlay) {}
  // ngAfterViewInit(): void {
  //   setTimeout(() => {
  //     const dialogRef = this.dialog.open(FollowPopupDialogComponent, {
  //       disableClose: true,
  //       panelClass: 'custom-fullscreen-dialog',
  //       hasBackdrop: true,
  //       scrollStrategy: this.overlay.scrollStrategies.noop(),
  //     });
  //     setTimeout(() => dialogRef.close(), 70000);
  //   }, 1000);
  // }
}
