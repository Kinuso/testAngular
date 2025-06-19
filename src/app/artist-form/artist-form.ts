import { ArtistService } from '../artistService/artist-service';
import {Component, inject, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-artist-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './artist-form.html',
  styleUrl: './artist-form.scss'
})

export class ArtistForm {

  artist = new FormControl('');
  image = new FormControl('');

  private artistsService = inject(ArtistService)

  artistForm = new FormGroup({
    nom: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required)

  });

  onSubmit() {

    if (this.artistForm.valid) {

      const formValue = this.artistForm.value;

      const artist = {
        name: formValue.nom ?? '',
        photo: formValue.image ?? ''
      };

      // this.artistsService.addArtist(artist)
      this.artistForm.reset();
    }
  }
}

