import { Routes } from '@angular/router';
import { MediaItemRxformComponent } from './media-item-rxform/media-item-rxform.component';
import { MediaItemListComponent } from './media-item-list/media-item-list.component';

const appRoutes : Routes = [
    { path: 'add', component: MediaItemRxformComponent },
    { path: ':medium', component: MediaItemListComponent }, // Order is important
    { path: '', pathMatch: 'full', redirectTo: 'all' }
]; // No need to export since we are not injecting it anywhere