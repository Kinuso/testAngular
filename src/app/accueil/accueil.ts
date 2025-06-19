import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accueil.html',
  styleUrl: './accueil.scss'
})
export class Accueil {
  showText = false;

  toggleText() {
    if (this.showText) {
      this.showText = false;
    } else {
      this.showText = true;
    }
  }
}