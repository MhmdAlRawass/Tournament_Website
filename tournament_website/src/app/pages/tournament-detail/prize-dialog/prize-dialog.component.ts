import { CommonModule } from '@angular/common';
import {
  Component,
  AfterViewInit,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

declare global {
  interface Window {
    confetti?: any;
  }
}

@Component({
  selector: 'app-prize-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prize-dialog.component.html',
  styleUrls: ['./prize-dialog.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9) translateY(40px)' }),
        animate(
          '600ms cubic-bezier(0.16, 1, 0.3, 1)',
          style({ opacity: 1, transform: 'scale(1) translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '400ms ease-in',
          style({ opacity: 0, transform: 'scale(0.9) translateY(40px)' })
        ),
      ]),
    ]),
  ],
})
export class PrizeDialogComponent implements AfterViewInit, OnDestroy {
  isVisible = true;
  private hasShownPopup = false;
  private confettiEndTime = 0;
  private animationFrameId: number | null = null;

  tomorrowNoon: Date = (() => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    return date;
  })();

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<PrizeDialogComponent>
  ) {}

  ngAfterViewInit(): void {
    this.createBackgroundParticles();
    this.resizeCanvas();
    setTimeout(() => this.showPopup(), 1000);
  }

  ngOnDestroy(): void {
    this.stopConfetti();
  }

  navigateToRegister() {
    this.router.navigate(['tournament/register']);
    this.closePopup();
  }

  private createBackgroundParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 15}s`;
      particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
      container.appendChild(particle);
    }
  }

  private showPopup() {
    if (this.hasShownPopup) return;
    const popup = document.getElementById('prizePopup');
    popup?.classList.add('show');
    this.startConfetti();
    this.hasShownPopup = true;
  }

  closePopup() {
    this.isVisible = false;
    const popup = document.getElementById('prizePopup');
    popup?.classList.remove('show');
    this.stopConfetti();
    document.body.style.overflow = 'auto';
    this.dialogRef.close();
  }

  private startConfetti() {
    const canvas = document.getElementById(
      'tsparticles-confetti-canvas'
    ) as HTMLCanvasElement;

    if (!canvas || typeof window.confetti !== 'function') return;

    const colors = ['#bb0000', '#ffffff'];
    this.confettiEndTime = Date.now() + 15000;

    const runFrame = () => {
      window.confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
        canvas,
        disableForReducedMotion: true,
      });

      window.confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
        canvas,
        disableForReducedMotion: true,
      });

      if (Date.now() < this.confettiEndTime) {
        this.animationFrameId = requestAnimationFrame(runFrame);
      }
    };

    runFrame();
  }

  private stopConfetti() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    const canvas = document.getElementById(
      'tsparticles-confetti-canvas'
    ) as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
  }

  private resizeCanvas() {
    const canvas = document.getElementById(
      'tsparticles-confetti-canvas'
    ) as HTMLCanvasElement;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.resizeCanvas();
  }

  @HostListener('document:keydown', ['$event'])
  onEscape(event: KeyboardEvent) {
    if (event.key === 'Escape') this.closePopup();
  }
}
