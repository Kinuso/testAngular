import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface ArtistModel {
  id: string;
  nom: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  
  private apiUrl = 'https://artists-api-ndhd.onrender.com/artists';
  private token = 'f3e91f07a577250eb7bda4fccf37adf0';
  
  public artistes: ArtistModel[] = [];

  constructor(private http: HttpClient) {}

  private getHeaders() {
    return {
      headers: { 'Authorization': `Bearer ${this.token}` }
    };
  }

  fetchArtists(): Observable<ArtistModel[]> {
    return this.http.get<ArtistModel[]>(this.apiUrl, this.getHeaders())
      .pipe(tap(data => this.artistes = data));
  }

  getArtist(id: string): Observable<ArtistModel> {
    return this.http.get<ArtistModel>(`${this.apiUrl}/${id}`, this.getHeaders());
  }

  addArtist(artist: { name: string, photo: string }): Observable<ArtistModel> {
    return this.http.post<ArtistModel>(this.apiUrl, artist, this.getHeaders())
      .pipe(tap(newArtist => this.artistes.push(newArtist)));
  }

  updateArtist(id: string, artist: { name?: string, photo?: string }): Observable<ArtistModel> {
    return this.http.put<ArtistModel>(`${this.apiUrl}/${id}`, artist, this.getHeaders())
      .pipe(tap(updated => {
        const idx = this.artistes.findIndex(a => a.id === id);
        if (idx !== -1) this.artistes[idx] = updated;
      }));
  }

  deleteArtist(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.getHeaders())
      .pipe(tap(() => {
        this.artistes = this.artistes.filter(a => a.id !== id);
      }));
  }
}