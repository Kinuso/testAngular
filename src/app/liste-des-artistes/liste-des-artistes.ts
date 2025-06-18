import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistService } from '../artistService/artist-service';


@Component({
  selector: 'app-liste-des-artistes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './liste-des-artistes.html',
  styleUrl: './liste-des-artistes.scss'
})
export class ListeDesArtistes {

  private artistsService = inject(ArtistService)

    artistes  = this.artistsService.artistes;

      deleteArtist(index: number) {
        this.artistsService.deleteArtist(index)
  }
}