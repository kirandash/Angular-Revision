import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'; // This holds the function for bootstrapping our root module

import { AppModule } from './app/app.module'; // Import app module so that it can be bootstrapped
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule) // Bootstrapping our appmodule
  .catch(err => console.error(err));
