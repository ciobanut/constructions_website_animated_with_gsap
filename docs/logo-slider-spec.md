# SPEC: Logo Slider Continuu (Infinite Marquee)

## 1. Overview

Înlocuim secțiunea "Our Partners" statică din Footer (`Footer.astro`) și actualul Swiper cu un slider de logo-uri care se rotește **continuu, la infinit**, într-o bandă orizontală fără capăt vizibil.

---

## 2. Cerințe Funcționale

| # | Cerință | Detalii |
|---|---------|---------|
| 1 | **Desktop: 5 logo-uri vizibile simultan** | Fereastra de vizualizare arată exact 5 logo-uri. La rezoluții ≥ 1024px. |
| 2 | **Tablet: 3 logo-uri vizibile** | ≥ 768px. |
| 3 | **Mobile: 2 logo-uri vizibile** | < 768px. |
| 4 | **Animare continuă** | Logo-urile se deplasează la stânga într-un loop infinit, fără pauză. |
| 5 | **Viteză constantă, lină** | Tranziție lineară, fără accelerație/decelație. |
| 6 | **Fără întrerupere la hover** | Mișcarea continuă indiferent de hover. |
| 7 | **Pauză pe hover (opțional)** | Putem adăuga `animation-play-state: paused` pe hover — de discutat. |
| 8 | **15 logo-uri SVG inline** | Logo-urile sunt incluse direct în HTML (inline SVG), nu încărcate ca `<img>`. |
| 9 | **Culori uniforme** | Toate logo-urile afișate în `#6b7280` (text-gray-500) cu `fill-current`. |

---

## 3. Abordare Tehnică

### Opțiunea A — CSS Marquee (Recomandată)

Folosim CSS `@keyframes` + `translateX` pe un container dublat (15 × 2 = 30 logo-uri).

**Avantaje:**
- Zero JavaScript pentru mișcarea de bază
- 60fps asigurat de `transform` (compositor thread)
- Fără dependențe externe
- Loop infinit perfect — containerul dublat creează un reset invizibil

**Dezavantaje:**
- Dublarea DOM-ului (30 de noduri SVG în loc de 15)

### Opțiunea B — GSAP Infinite Loop

Folosim `gsap.to()` cu un timeline circular care, la final, resetează poziția instant.

**Avantaje:**
- Nu dublează DOM-ul
- Control fin peste viteză, easing, pause/resume

**Dezavantaje:**
- Necesită JavaScript mereu activ
- Mai greu de sincronizat la tab-uri ascunse

---

### Decizie: Opțiunea A (CSS Marquee)

Pentru simplitate și performanță, mergem cu CSS pur. GSAP este deja folosit în proiect pentru alte animații, dar pentru un marquee linear constant, CSS-ul este soluția corectă.

---

## 4. Arhitectura Componentei

### Fișier nou: `src/components/LogoTicker.astro`

```
LogoTicker.astro
├── <section> wrapper cu padding și fundal
│   ├── <h2> sau <p> titlu secțiune ("Our Partners")
│   ├── <div class="ticker-track"> — container cu overflow hidden
│   │   ├── <div class="ticker-content"> — conținutul dublat (15 + 15 logo-uri)
│   │   │   ├── <div class="ticker-item"> × 15 (originale)
│   │   │   │   └── <svg> ... </svg>
│   │   │   ├── <div class="ticker-item"> × 15 (duplicate)
│   │   │   │   └── <svg> ... </svg> (identice)
│   │   └── </div>
│   └── </div>
└── </section>
```

### Plasare în pagină

În `index.astro`, între `<StatsSection />` și `<Footer />`:

```astro
<LogoTicker />
<Footer />
```

---

## 5. Stilizare Detaliată

### Container `.ticker-track`

```css
.ticker-track {
  overflow: hidden;
  width: 100%;
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 5%,
    black 95%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 5%,
    black 95%,
    transparent 100%
  );
}
```

`mask-image` creează efectul de fade pe margini: logo-urile intră și ies lin, nu brusc.

### Conținutul `.ticker-content`

```css
.ticker-content {
  display: flex;
  gap: 4rem;          /* spacing între logo-uri pe desktop */
  width: max-content;
  animation: ticker-scroll 40s linear infinite;
}

@keyframes ticker-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);  /* exact jumătate = logo-urile originale */
  }
}
```

Dublăm setul de logo-uri, iar `translateX(-50%)` mută containerul exact cu lățimea primului set. Când animația ajunge la 100%, resetează instant la 0% — pentru ochiul uman este invizibil pentru că al doilea set este identic cu primul.

### Item `.ticker-item`

```css
.ticker-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc((100vw - 4rem * 4) / 5);  /* desktop: 5 itemi, gap 4rem */
}

@media (max-width: 1023px) {
  .ticker-item {
    width: calc((100vw - 3rem * 2) / 3);  /* tablet: 3 itemi, gap 3rem */
  }
}

@media (max-width: 767px) {
  .ticker-item {
    width: calc((100vw - 2rem * 1) / 2);  /* mobile: 2 itemi, gap 2rem */
  }
}
```

Alternativ, putem folosi o combinație de `flex: 0 0 auto` cu padding lateral pe fiecare item și lăsăm `gap` să dicteze spațierea. Metoda cu `width: calc()` asigură că întotdeauna se împarte exact.

### SVG-uri

Toate SVG-urile primesc clasele:
```
class="w-32 h-10 | lg:w-36 lg:h-14 text-gray-600 fill-current 4xl:w-40 4xl:h-16 dark:text-white"
```

---

## 6. Viteza de Animare

| Context | Durată | Rată |
|---------|--------|------|
| Desktop (5 vizibile) | 40s per ciclu | ~3.75s per logo |
| Tablet (3 vizibile) | 50s per ciclu | ~3.33s per logo |
| Mobile (2 vizibile) | 60s per ciclu | ~2.67s per logo |

Viteza simțită de utilizator: un logo nou apare la fiecare ~3-4 secunde. Asta oferă timp suficient să fie citit fără a părea static.

Putem ajusta cu ușurință modificând `animation-duration`.

---

## 7. Logo-urile (15 SVG-uri inline)

Toate logo-urile sunt extrase din marca HTML existentă. Sunt 15 branduri diferite (la index 0–14), fiecare fiind un SVG inline cu clasele de styling:

1. **Logo 0** — text negru, `width="924" height="391"` (brand mare, tip construcții)
2. **Logo 1** — `width="1015" height="160"` 
3. **Logo 2** — `width="1000" height="822"` (formă verticală, iconiță construcție)
4. **Logo 3** — `width="178" height="30"` (brand orizontal, text)
5. **Logo 4** — `width="292" height="184"` 
6. **Logo 5** — `width="134" height="23"` (brand mic, text)
7. **Logo 6** — `id="vqwtlqvmhp-Layer_1"`, `viewBox="0 0 371 150"` („SAN MARCO”)
8. **Logo 7** — `width="617" height="133"` (text lung)
9. **Logo 8** — `id="rresrtjumb-Layer_1"`, `viewBox="0 0 680.3 53.9"`
10. **Logo 9** — `width="1705" height="111"` (foarte lat)
11. **Logo 10** — `id="tcliaxurfh-Layer_1"`, conține litera „X” / „KNAUF”
12. **Logo 11** — `id="hyxzvanywv-Layer_1"`, `viewBox="0 0 2483.93 306.62"`
13. **Logo 12** — `id="abtrnubbgh-Layer_1"`, `viewBox="0 0 994.7 350.8"` (logo tip text)
14. **Logo 13** — `width="601" height="55"` (text cu „B” mare)
15. **Logo 14** — `width="230" height="41"` (text scurt)

**Toate SVG-urile trebuie să primească aceste clase de styling:**
```
w-32 h-10 | lg:w-36 lg:h-14 text-gray-600 fill-current 4xl:w-40 4xl:h-16 dark:text-white
```

Atenție: logo-urile care nu au `class` atribuită inițial trebuie să primească aceste clase. Cele care au deja `class` (ex: cele cu `id="...-Layer_1"`) — păstrăm clasa existentă.

---

## 8. Responsive Breakpoints

| Breakpoint | Nr. logo-uri vizibile | Gap între logo-uri | Padding secțiune | Dimensiune SVG |
|------------|----------------------|---------------------|------------------|----------------|
| ≥ 1280px (xl) | 5 | 4rem | 5rem 0 | w-40 h-16 |
| ≥ 1024px (lg) | 5 | 4rem | 4rem 0 | w-36 h-14 |
| ≥ 768px (md) | 3 | 3rem | 3rem 0 | w-32 h-10 |
| < 768px | 2 | 2rem | 2rem 0 | w-32 h-10 |

---

## 9. Integrare cu Proiectul

### `index.astro`

Adăugăm între `<StatsSection />` și `<Footer />`:

```astro
import LogoTicker from "../components/LogoTicker.astro";

// în template:
<StatsSection />
<LogoTicker />
<Footer />
```

### `Footer.astro`

Actuala secțiune `.footer-partners` din footer se elimină — este mutată în `LogoTicker.astro`.

### Temă dark-mode

SVG-urile au deja `dark:text-white` în clase, ceea ce înseamnă că în dark mode se vor vedea albe.

---

## 10. Implementare CSS Pur — Detalii Cheie

### Trucul loop-ului infinit

```
[Logo 1][Logo 2]...[Logo 15][Logo 1][Logo 2]...[Logo 15]
<-------- 50% din lățime --------><------- 50% ------------->
                                   ^
                                   when animation reaches here →
                                   transform: translateX(-50%)
                                   → reset instant la translateX(0)
```

Pentru ochi: continuu. Pentru browser: un salt invizibil pentru că conținutul de la 50% este identic cu cel de la 0%.

### Performanță

- `transform: translateX()` este animat pe compositor — nu declanșează layout/reflow
- Folosim `will-change: transform` pe `.ticker-content`
- Fără `left`, `margin-left`, sau `translate3d` — doar `translateX`

### Reduced Motion

Pentru utilizatori cu `prefers-reduced-motion: reduce`:

```css
@media (prefers-reduced-motion: reduce) {
  .ticker-content {
    animation: none;
  }
}
```

---

## 11. Plan de Implementare

### Step 1 — Creează `src/components/LogoTicker.astro`

- Toate cele 15 SVG-uri inline, extras din codul existent
- Fiecare SVG cu clasele de Tailwind menționate
- Container dublat (15 × 2)
- Stiluri CSS pentru marquee
- `mask-image` pentru fade pe margini
- Responsive breakpoints

### Step 2 — Modifică `src/pages/index.astro`

- Importă `LogoTicker`
- Adaugă `<LogoTicker />` între `<StatsSection />` și `<Footer />`

### Step 3 — Curăță `Footer.astro`

- Elimină secțiunea `.footer-partners` (Our Partners) din footer

### Step 4 — Testează

- Verifică loop-ul continuu (lasă pagina deschisă 2-3 minute)
- Verifică 5 logo-uri pe desktop
- Verifică 3 pe tablet, 2 pe mobile
- Verifică `prefers-reduced-motion`
- Verifică dark mode

---

## 12. Considerații Suplimentare

### Dimensiunea fișierului

Toate cele 15 SVG-uri inline vor crește dimensiunea HTML-ului. Dacă devine o problemă de performanță, putem externaliza SVG-urile ca fișiere `.svg` în `/public/logos/` și le încărcăm cu `<img>`, dar pierdem controlul asupra culorii (`fill-current`). Alternativ, păstrăm inline doar SVG-urile mici și externalizăm pe cele mari.

**Decizie:** Păstrăm inline — proiectul este deja orientat spre animație și încărcarea inițială nu este o prioritate.

### Secțiune separată vs. în Footer

LogoTicker este un component separat (nu în Footer) pentru că:
- Apare înaintea footer-ului, deasupra
- Are fundal propriu (`bg-[#0c0c0c]` la fel ca StatsSection)
- Este o secțiune de conținut, nu o parte a navigării din footer

### Gradient mask

`mask-image` cu gradient de la `transparent` → `black` → `transparent` pe margini:
- Previne tăierea bruscă a logo-urilor la marginile containerului
- Crează iluzia că logo-urile vin „de undeva" și dispar „undeva"
- Se aplică pe `.ticker-track` (containerul cu `overflow: hidden`)

---

## 13. Cod Schematic al Componentei

```astro
---
// src/components/LogoTicker.astro
// No props needed
---

<section class="logo-ticker">
  <div class="max-w-full mx-auto">
    <p class="ticker-label">Our Partners</p>
    <div class="ticker-track">
      <div class="ticker-content">
        <!-- Set 1: 15 logo-uri -->
        {#each logos as logo}
          <div class="ticker-item">{@html logo}</div>
        {/each}
        <!-- Set 2: 15 logo-uri (duplicate pentru loop) -->
        {#each logos as logo}
          <div class="ticker-item">{@html logo}</div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  /* ... CSS pentru marquee, responsive, reduced-motion ... */
</style>
```
