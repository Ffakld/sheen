const BASE=new URL('./',self.location.href);
const CACHE='sheen-gh-v1-'+BASE.pathname;
const paths=['./','studio.css','app.js','engine.js','studio.js','film-shader.js','camera-art.js','selects.js','assets/icon-v2-192.png','assets/icon-v2-512.png','assets/apple-touch-icon-v2.png','assets/favicon-v2.png','assets/grain.svg','assets/strands.svg','assets/alexandria.ttf','assets/bodoni-display.ttf','assets/scene.jpg','assets/demo.mp4','assets/mediabunny.mjs'];
const SHELL=paths.map(p=>new URL(p,BASE).href);
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('sheen-gh-')&&k.endsWith(BASE.pathname)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==BASE.origin||!u.pathname.startsWith(BASE.pathname)||e.request.headers.has('range'))return;e.respondWith(fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));}return r;}).catch(()=>caches.match(e.request).then(r=>r||new Response('Offline',{status:503}))));});
