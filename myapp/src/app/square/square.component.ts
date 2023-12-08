import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-square',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="h-24 w-24 bg-slate-400">
      <div class="mx-auto rounded-full h-20 w-20" [ngClass]="[color]"></div>
    </button>
  `,
  styles: ``,
})
export class SquareComponent implements OnInit {
  @Input() value!: 'R' | 'Y';
  color!: string;

  ngOnInit(): void {
    switch (this.value) {
      case 'R':
        this.color = 'bg-red-500';
        break;
      case 'Y':
        this.color = 'bg-yellow-400';
        break;
      default:
        this.color = 'bg-slate-100';
        break;
    }
  }
}
