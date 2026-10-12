// The game's service worker: only what makes it installable as an app (home
// screen, full screen). It keeps nothing: every file comes fresh from the
// site, so a new version shows at once. Offline, opening the game says so.
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()))
self.addEventListener('fetch', (event) => {
  if (event.request.mode !== 'navigate') return // (everything else: straight to the network)
  event.respondWith(
    fetch(event.request).catch(
      () =>
        new Response(
          '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width"><body style="background:#08080c;color:#fff;font-family:sans-serif;display:grid;place-content:center;height:100vh;margin:0;text-align:center"><p>インターネットにつながっていません。<br>つながってから、もう一度開いてください。</p></body>',
          { headers: { 'Content-Type': 'text/html; charset=utf-8' } },
        ),
    ),
  )
})
