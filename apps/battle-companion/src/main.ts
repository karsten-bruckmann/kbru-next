import { importProvidersFrom, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { initializeApp } from 'firebase/app';

import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';

const firebaseConfig = {
  apiKey: 'AIzaSyCyG3OxnaeEcOICj45xeQELH7PNBF6Yjtw',
  authDomain: 'kbru-apps.firebaseapp.com',
  projectId: 'kbru-apps',
  storageBucket: 'kbru-apps.appspot.com',
  messagingSenderId: '707796446240',
  appId: '1:707796446240:web:e3d0ad27e7ad12e2ba6045',
};

const app = initializeApp(firebaseConfig);

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom(StoreModule.forRoot()),
    importProvidersFrom(EffectsModule.forRoot()),
    importProvidersFrom(StoreDevtoolsModule.instrument({ maxAge: 50 })),
    importProvidersFrom(IonicModule.forRoot()),
    importProvidersFrom(
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: !isDevMode(),
        // Register the ServiceWorker as soon as the application is stable
        // or after 30 seconds (whichever comes first).
        registrationStrategy: 'registerWhenStable:30000',
      })
    ),
  ],
}).catch((err) => console.error(err));
