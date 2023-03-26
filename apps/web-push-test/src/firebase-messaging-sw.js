importScripts(
  'https://www.gstatic.com/firebasejs/9.18.0/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.18.0/firebase-messaging-compat.js'
);

firebase.initializeApp({
  apiKey: 'AIzaSyCyG3OxnaeEcOICj45xeQELH7PNBF6Yjtw',
  authDomain: 'kbru-apps.firebaseapp.com',
  projectId: 'kbru-apps',
  storageBucket: 'kbru-apps.appspot.com',
  messagingSenderId: '707796446240',
  appId: '1:707796446240:web:c83da61ef5957468ba6045',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

self.addEventListener('notificationclick', (event) => {
  console.log(event);
});
