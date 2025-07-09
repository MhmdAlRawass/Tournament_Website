import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countdown',
  pure: false,
})
export class CountdownPipe implements PipeTransform {
  transform(value: string | Date, showSeconds?: boolean): string {
    const targetDate = new Date(value).getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      return 'Already started';
    }

    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    const parts = [];
    if (days > 0) parts.push(`${days} day${days > 1 ? 's' : ''}`);
    if (hours > 0) parts.push(`${hours} hr${hours > 1 ? 's' : ''}`);
    if (minutes > 0) parts.push(`${minutes} min${minutes > 1 ? 's' : ''}`);
    if (showSeconds) parts.push(`${seconds} sec${seconds > 1 ? 's' : ''}`);

    return parts.join(' ');
  }
}
