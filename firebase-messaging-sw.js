// วางไฟล์นี้ไว้โฟลเดอร์เดียวกับ index.html (ชื่อต้องเป็น firebase-messaging-sw.js เป๊ะ)
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));

self.addEventListener("push", e => {
  let p = {};
  try { p = e.data ? e.data.json() : {}; } catch (x) {}
  const n = p.notification || {}, d = p.data || {};
  e.waitUntil(
    self.registration.showNotification(n.title || d.title || "Love Delivery", {
      body: n.body || d.body || "มีออเดอร์ใหม่เข้ามา",
      data: { url: "./" }
    })
  );
});

self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
      for (const c of list) if ("focus" in c) return c.focus();
      return self.clients.openWindow((e.notification.data && e.notification.data.url) || "./");
    })
  );
});
