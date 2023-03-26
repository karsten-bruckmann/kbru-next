import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { initializeApp } from 'firebase/app';

import { AppComponent } from './app.component';

initializeApp({
  apiKey: 'AIzaSyCyG3OxnaeEcOICj45xeQELH7PNBF6Yjtw',
  authDomain: 'kbru-apps.firebaseapp.com',
  projectId: 'kbru-apps',
  storageBucket: 'kbru-apps.appspot.com',
  messagingSenderId: '707796446240',
  appId: '1:707796446240:web:c83da61ef5957468ba6045',
});

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
