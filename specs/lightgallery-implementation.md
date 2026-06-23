# Spec: Implementare lightGallery în ProjectGallery

**Cerință:** Înlocuirea galeriei existente (link-uri simple cu `target="_blank"`) cu lightGallery, adăugând plugin-urile lgZoom, lgAutoplay, lgFullscreen, lgHash, lgThumbnail, lgMediumZoom.

---

## 1. Instalare

```bash
npm install lightgallery
```

Un singur dependency — lightGallery include toate plugin-urile în pachet.

---

## 2. Fișier de modificat

`src/components/ProjectGallery.astro` — un singur fișier. Nu se modifică `src/pages/projects/[...slug].astro` (doar consumă componenta).

---

## 3. Importuri (frontmatter + script)

**Frontmatter (`---`):** Nimic de schimbat — lightGallery se inițializează din browser, nu e nevoie de importuri server-side.

**Bloc `<script>`:** Importuri ES module:

```ts
import lightGallery from 'lightgallery';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-fullscreen.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-autoplay.css';
import 'lightgallery/css/lg-medium-zoom.css';

import lgZoom from 'lightgallery/plugins/zoom';
import lgAutoplay from 'lightgallery/plugins/autoplay';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgHash from 'lightgallery/plugins/hash';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgMediumZoom from 'lightgallery/plugins/mediumzoom';
```

**Notă:** lgHash și lgMediumZoom nu au CSS propriu — nu se importă fișiere `.css` pentru ele.

---

## 4. Transformarea HTML-ului

### Înainte (actual)
```astro
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {images.map((img, i) => (
    <a href={img} target="_blank" class="gallery-item group relative ...">
      <img src={img} alt={`${title} - Image ${i + 1}`} ... />
      <div class="absolute inset-0 ..." />
    </a>
  ))}
</div>
```

### După
```astro
<div id="project-gallery" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {images.map((img, i) => (
    <a
      href={img}
      data-lg-size="1920-1080"
      class="gallery-item group relative aspect-[4/3] overflow-hidden rounded-xl bg-[#1a1a1a] block"
    >
      <img
        src={img}
        alt={`${title} - Image ${i + 1}`}
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading={i < 4 ? 'eager' : 'lazy'}
      />
      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
    </a>
  ))}
</div>
```

### Diferențe cheie:
- Div-ul wrapper capătă `id="project-gallery"` (necesar pentru inițializare)
- Se elimină `target="_blank"` de pe `<a>` — lightGallery interceptează click-ul
- Se adaugă `data-lg-size="1920-1080"` — ajută lightGallery să calculeze animația inițială de zoom (opțional, dar recomandat)
- Clasele Tailwind existente (aspect-ratio, hover effects, grid) se păstrează — lightGallery nu le suprascrie

---

## 5. Inițializarea JavaScript

În același bloc `<script>`, **după** importuri și **după** logica GSAP existentă:

```ts
const galleryElement = document.getElementById('project-gallery');

if (galleryElement) {
  const lg = lightGallery(galleryElement, {
    plugins: [lgZoom, lgAutoplay, lgFullscreen, lgHash, lgThumbnail, lgMediumZoom],
    
    // License: lightGallery este gratuit pentru uz non-comercial / open-source.
    // Pentru projects comerciale, înlocuiește cu o cheie validă.
    licenseKey: '0000-0000-000-0000',
    
    speed: 500,
    
    // Thumbnail settings
    thumbnail: true,
    animateThumb: true,
    showThumbByDefault: false,
    
    // Zoom settings
    zoom: true,
    actualSize: true,
    
    // Autoplay settings
    autoplay: true,
    autoplayControls: true,
    pauseOnHover: true,
    progressBar: true,
    
    // Fullscreen
    fullScreen: true,
    
    // Medium Zoom (înlocuiește click zoom pe mobile)
    mediumZoom: true,
    
    // Hash — actualizează URL-ul cu slide-ul curent (util pentru bookmark)
    hash: true,
    
    // Altele
    loop: true,
    download: false,
    counter: true,
    enableDrag: true,
    enableSwipe: true,
    swipeThreshold: 50,
    
    // Prev/Next buttons
    controls: true,
    mousewheel: true,
    
    // Preload
    preload: 2,
  });
}
```

---

## 6. Păstrarea animațiilor GSAP

Animațiile GSAP existente (stagger fade-in/slide-up la scroll) rămân neschimbate — ele acționează pe clasa `.gallery-item` care se păstrează. lightGallery nu interferează cu layout-ul gridului.

---

## 7. clean-up & memory management

În același script, înainte de `export` (dacă există pattern de hot module replacement în dev) sau ca eveniment `beforeunload`:

```ts
// Curățare la părăsirea paginii (previne memory leaks)
window.addEventListener('beforeunload', () => {
  if (lg) lg.destroy();
});
```

Pentru Astro (care folosește Vite HMR), e suficient să distrugem instanța la `beforeunload` — la re-render, componenta se remontează fresh.

---

## 8. Layout & responsive

Pagina de proiect `.prose-invert` are `max-w-6xl mx-auto px-6`. Galeria lightGallery va moșteni lățimea containerului părinte. Nu e nevoie de CSS suplimentar — lightGallery overlayer-ul (`lg`) este `position: fixed` și ocupă viewport-ul indiferent de flow-ul documentului.

---

## 9. Imagini .avif

lightGallery suportă AVIF nativ în browserele care îl suportă. Galeria actuală folosește deja `.avif`. Nicio schimbare necesară.

---

## 10. Ordinea execuției în script

Blocul `<script>` final va avea această structură:

1. Importuri (GSAP plugins + lightGallery + plugins + CSS)
2. `gsap.registerPlugin(ScrollTrigger)`
3. GSAP entrance animations (existente, neschimbate)
4. **NOU:** Inițializare lightGallery cu opțiunile de mai sus
5. **NOU:** Event listener `beforeunload` pentru destroy

---

## 11. Dependențe externe

Niciuna. lightGallery nu are peer dependencies.

---

## Rezumat modificări

| Fișier | Tip modificare |
|--------|---------------|
| `package.json` | Adăugare dependency `lightgallery` |
| `src/components/ProjectGallery.astro` | Adăugare importuri CSS/JS, transformare HTML grid → container lightGallery, inițializare + destroy |

Fără modificări de routing, layout, sau alte componente. Fără fișiere CSS noi. Fără config suplimentară.
