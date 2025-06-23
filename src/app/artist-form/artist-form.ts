import { ArtistService } from '../artistService/artist-service';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artist-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './artist-form.html',
  styleUrl: './artist-form.scss'
})
export class ArtistForm {
  @Output() artistAdded = new EventEmitter<void>();

  artistForm = new FormGroup({
    name: new FormControl('', Validators.required),
    photo: new FormControl('', Validators.required)
  });

  private artistsService = inject(ArtistService);

  // ✅ On ajoute cette ligne
  public infoMessage: string | null = null;

  onSubmit() {
    if (this.artistForm.valid) {
      const formValue = this.artistForm.value;
      const artist = {
        name: formValue.name ?? '',
        photo: formValue.photo ?? ''
      };
      this.artistsService.addArtist(artist).subscribe({
        next: (newArtist) => {
          console.log('Nouvel artiste créé :', newArtist);
          this.artistForm.reset();
          this.artistAdded.emit();
          this.infoMessage = "Artiste ajouté avec succès"; // ✅ Nettoyer l'erreur s'il y en avait une
        },
        error: (err) => {
          this.infoMessage = err?.error?.message || 'Erreur interne du serveur';
        }
      });
    }
  }
}
