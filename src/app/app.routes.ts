import { Routes } from '@angular/router';
import { Accueil } from './accueil/accueil';
import { ListeDesArtistes } from './liste-des-artistes/liste-des-artistes';
import { ArtistForm } from './artist-form/artist-form';

export const routes: Routes = [
    { path: '', redirectTo: 'accueil', pathMatch: 'full' },
    { path: 'accueil', component: Accueil },
    { path: 'liste-artistes', component: ListeDesArtistes },
    { path: 'form-artist', component: ArtistForm }
];
