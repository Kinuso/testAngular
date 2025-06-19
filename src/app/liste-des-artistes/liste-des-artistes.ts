import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistService, ArtistModel } from '../artistService/artist-service';
import { Artist } from '../artist/artist'; // <-- Ajoute ceci


@Component({
  selector: 'app-liste-des-artistes',
  standalone: true,
  imports: [CommonModule, Artist], // <-- Ajoute Artist ici
  templateUrl: './liste-des-artistes.html',
  styleUrl: './liste-des-artistes.scss'
})
export class ListeDesArtistes implements OnInit {
  private artistsService = inject(ArtistService);
  artistes: ArtistModel[] = [];

  changeDetection = inject(ChangeDetectorRef);

  ngOnInit() {
    this.artistsService.getArtists().subscribe({
      next: (data) => {
        this.artistes = data;
        this.changeDetection.detectChanges();
      },
      error: (err) => {
        console.error('Erreur API:', err);
      }
    });
  }

  deleteArtist(index: number) {

    const artist = this.artistes[index];
    if (!artist) return;
    this.artistsService.deleteArtist(artist.id).subscribe({
      next: () => {
        this.artistes.splice(index, 1);
        this.changeDetection.detectChanges();
        console.log('Artiste supprimé');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression:', err);
      }
    });
  }

  onArtistAdded() {
    this.artistsService.getArtists().subscribe({
      next: (data) => {
        this.artistes = data;
      }
    });
  }

}