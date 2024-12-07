import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"finde-ag","appId":"1:944897839059:web:622c57b33e72d65d23e926","storageBucket":"finde-ag.firebasestorage.app","apiKey":"AIzaSyBEIHvPCyTQQVe6jhnzrbd8PglgAbeRkRI","authDomain":"finde-ag.firebaseapp.com","messagingSenderId":"944897839059","measurementId":"G-E4ZGQHKGZY"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
