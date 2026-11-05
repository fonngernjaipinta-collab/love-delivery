
importScripts("https://www.gstatic.com/firebasejs/13.2.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/13.2.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyC25WEoTG90IS1SuxgUEtVmNtXFAmpevos",
  authDomain: "lovedelivery.firebaseapp.com",
  projectId: "lovedelivery",
  storageBucket: "lovedelivery.firebasestorage.app",
  messagingSenderId: "747278269239",
  appId: "1:747278269239:web:b0c7daecea0820ceb038b2",
  measurementId: "G-HYRY00ZYRZ"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title =
    payload.notification?.title ||
    payload.data?.title ||
    "Love Delivery";

  const options = {
    body:
      payload.notification?.body ||
      payload.data?.body ||
      "มีออเดอร์ใหม่เข้ามา",
    icon: "/icon-192.png",
    data: {
      url: "/"
    }
  };

  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then((clientList) => {
      for (const client of clientList) {
        if ("focus" in client) {
          return client.focus();
        }
      }

      return clients.openWindow("/");
    })
  );
});
