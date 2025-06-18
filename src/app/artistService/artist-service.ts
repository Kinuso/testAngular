import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  artistes = [
    { nom: 'Giulia Rossi', image: "/images/artiste2.jpg", id: 1 },
    { nom: 'Marco Bianchi', image: "/images/artiste1.jpg", id: 2 },
    { nom: 'Elena Ferraro', image: "/images/artiste3.jpg", id: 3 },
  ];

  deleteArtist(index: number) {
    this.artistes.splice(index, 1);
  }

  addArtist(nom: string, image: string) {

    const lastArtist = this.artistes[this.artistes.length - 1];
    const id = lastArtist ? lastArtist.id + 1 : 1;

    this.artistes.push({ nom, image, id });
  }

  constructor() { }
}
