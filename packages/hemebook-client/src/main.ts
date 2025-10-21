import { bootstrapApplication } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { MainComponent } from './main.component.ts';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ViewHomeComponent } from './views/home/home.component.ts';
import { ViewAuthComponent } from './views/auth/auth.component.ts';
import { AUTH_CLIENT_TOKEN, AuthClient } from './services/auth.ts';

export const routes: Routes = [
  { path : '', component: ViewHomeComponent },
  { path : 'debug/auth', component: ViewAuthComponent },
];

const authClient = new AuthClient()

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: AUTH_CLIENT_TOKEN, useValue: authClient },
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};

bootstrapApplication(MainComponent, appConfig)
  .catch((err) => console.error(err));
