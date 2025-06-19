import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistModel } from '../artistService/artist-service';

@Component({
    selector: 'app-artist',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div>
      <h3>{{ artist?.name }}</h3>
      <img [src]="artist?.photo" [alt]="artist?.name" width="100" />
    </div>
  `
})
export class Artist {
    @Input() artist!: ArtistModel;
}