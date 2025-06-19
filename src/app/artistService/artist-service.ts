import { ChangeDetectorRef, inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface ArtistModel {
  id: string;
  name: string;
  photo: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor() {
  }

  private apiUrl: string = 'https://artists-api-ndhd.onrender.com/artists';
  private token: string = 'f3e91f07a577250eb7bda4fccf37adf0';

  public artistes: ArtistModel[] = [];

  private http = inject(HttpClient);
  // This service can now make HTTP requests via `this.http`.
  public getArtists(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<ArtistModel[]>(this.apiUrl, { headers });
  }
  
  public addArtist(params: { name: string, photo: string }): Observable<ArtistModel> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<ArtistModel>(this.apiUrl, params, { headers });
  }

  public deleteArtist(id: string): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, { headers });
  }
}