import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistService, ArtistModel } from '../artistService/artist-service';


@Component({
  selector: 'app-liste-des-artistes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './liste-des-artistes.html',
  styleUrl: './liste-des-artistes.scss'
})
export class ListeDesArtistes implements OnInit {
  private artistsService = inject(ArtistService);
  artistes: ArtistModel[] = [];

  ngOnInit() {
    this.artistsService.getArtists().subscribe({
      next: (data) => {
        this.artistes = data;
      },
      error: (err) => {
        console.error('Erreur API:', err);
      }
    });
  }

  deleteArtist(index: number) {
    // this.artistsService.deleteArtist(index.toString())
  }
}