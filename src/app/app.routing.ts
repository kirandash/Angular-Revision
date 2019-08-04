import { Routes, RouterModule } from '@angular/router'; // Routes: Only for type declaration, RouterModule for registering Routes array in app module
import { MediaItemRxformComponent } from './media-item-rxform/media-item-rxform.component';
import { MediaItemListComponent } from './media-item-list/media-item-list.component';

const appRoutes : Routes = [
    { path: 'add', component: MediaItemRxformComponent },
    { path: ':medium', component: MediaItemListComponent }, // Order is important
    { path: '', pathMatch: 'full', redirectTo: 'home' } // Default route will be redirected to 'home'
]; // No need to export since we are not injecting it anywhere

export const routing = RouterModule.forRoot(appRoutes);