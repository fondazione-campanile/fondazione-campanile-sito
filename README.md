# Sito Fondazione Antonio Campanile

Sito vetrina one page con sezione donazioni per la Fondazione Antonio Campanile (Valderice, TP).
HTML, CSS e JavaScript senza framework e senza build: i file del repository vengono pubblicati così come sono.

---

## Rami e ambienti

| Ramo | Contenuto | Pubblicato su |
|---|---|---|
| `main` (predefinito) | pagina "in costruzione" come `index.html` | **produzione**: https://www.fondazionecampanile.it (Vercel) |
| `sviluppo` | sito completo | anteprima: https://fondazione-campanile.github.io/fondazione-campanile-sito/ (GitHub Pages) e anteprima Vercel protetta |

**Ogni push su `main` va online subito.** Si lavora su `sviluppo`; `main` riceve il sito completo solo alla messa online, unendo `sviluppo`.

`main` contiene anche una versione precedente dei file del sito (CSS, JS, foto), non collegata da nessuna pagina. Non va ripulita a mano: file cancellati su `main` verrebbero cancellati anche nell'unione con `sviluppo`.

---

## Infrastruttura

**GitHub**: organizzazione `fondazione-campanile`, repository `fondazione-campanile-sito` (pubblico). Proprietario: account della Fondazione; gli sviluppatori sono membri dell'organizzazione.
Remote: `git@github.com:fondazione-campanile/fondazione-campanile-sito.git` (SSH).

**Vercel**: piano Hobby, account della Fondazione collegato a GitHub.
- Framework preset: Other (nessun comando di build)
- Production branch: `main`
- Domini: `www.fondazionecampanile.it` (principale), `fondazionecampanile.it` (redirect 308 verso `www`)
- Certificato SSL gestito da Vercel

**DNS (Aruba)**: record del sito impostati il 27/10/2026.

| Tipo | Nome | Valore |
|---|---|---|
| A | @ | 216.198.79.1 |
| CNAME | www | 883c0443d2527378.vercel-dns-017.com |

Da non modificare: MX `smtp.google.com` e i due TXT `google-site-verification` (email su Google Workspace), record tecnici Aruba (`localhost`, `_domainconnect`, `admin`, `ftp`). Valori precedenti per un eventuale ripristino: A `@` → `62.149.128.40`, CNAME `www` → `fondazionecampanile.it`. L'account Aruba gestisce anche altri domini.

---

## Struttura dei file

```
.
├── index.html            sito one page (su main: pagina "in costruzione")
├── donazioni.html        "Come funzionano le donazioni"
├── in-costruzione.html   pagina "in costruzione"
├── css/
│   ├── common.css        font, variabili, reset, utility
│   ├── sito.css          stili del sito e di donazioni.html
│   └── wip.css           stili della pagina "in costruzione"
├── js/
│   ├── menu.js           menu hamburger
│   ├── pilastri.js       linea e apertura dei pilastri
│   ├── impegni.js        schede Cura / Lavoro / Luoghi
│   ├── progetti.js       carosello dei progetti
│   ├── zoom.js           ingrandimento delle immagini
│   ├── intro.js          animazione di apertura
│   └── animazioni.js     comparse, scrittura dei titoli, fasce
└── assets/
    ├── favicon/
    ├── fonts/            EB Garamond 400, Figtree 400 e 600 (TTF, self-hosted)
    ├── img/              loghi
    └── photo/            fotografie
```

---

## Pagine

### index.html

| Ordine | Sezione | id | Sfondo | Script |
|---|---|---|---|---|
| 0 | Intro | – | blu notte | intro.js |
| 1 | Hero | – | blu notte | animazioni.js |
| 2 | Chi siamo | `chi-siamo` | avorio | animazioni.js |
| 3 | Dopo di noi | `dopo-di-noi` | blu notte | pilastri.js, zoom.js |
| 4 | Impegni | `impegni` | avorio | impegni.js |
| 5 | Progetti | `progetti` | blu notte | progetti.js, zoom.js |
| 6 | Fai una donazione | `dona` | terracotta scuro | – |
| 7 | Footer | `contatti` | blu notte | – |

Il menu (header) porta alle sezioni tramite ancore (`#chi-siamo`, `#dopo-di-noi`, …); `scroll-padding-top` evita che il titolo finisca sotto l'header fisso.

### donazioni.html — work in progress

Struttura definitiva (header con solo logo, colonna di testo, tre paragrafi, link "Torna al sito" verso `index.html#dona`, footer); **testi provvisori**. Anche il pulsante "Dona ora" in `index.html` è in attesa del link di pagamento.

Il footer è una **copia** di quello di `index.html`, con una sola differenza: il logo porta a `index.html` invece che a `#top`. Va modificato in entrambe le pagine.

### in-costruzione.html

Pagina con animazione del logo (`wip.css`). Su `main` è il file `index.html`.

---

## Stili

### Organizzazione

- **`common.css`**: `@font-face`, variabili (`:root`), reset minimo (`box-sizing`, immagini `display: block`, `strong` a 600), classe `.visually-hidden`. Usato da tutte le pagine.
- **`sito.css`**: un blocco per argomento, in quest'ordine: BASE · HEADER (mobile, desktop) · SEZIONI · FASCE · HERO · CHI SIAMO · DOPO DI NOI · IMPEGNI (mobile, desktop) · PROGETTI · FOOTER · ZOOM · DONA · PAGINA DONAZIONI · ANIMAZIONI · INTRO.

### Variabili

| Variabile | Valore | Uso |
|---|---|---|
| `--blu-notte` | `#1F3A5F` | sfondi scuri, testo su avorio |
| `--avorio` | `#F7F4EE` | sfondi chiari, testo su scuro |
| `--terracotta` | `#C0643A` | fasce, etichette, accenti su avorio |
| `--terracotta-chiaro` | `#E6956B` | testo e accenti su blu notte |
| `--terracotta-scuro` | `#A9532E` | sfondo della sezione Dona, link su avorio |
| `--font-titoli` | EB Garamond | titoli |
| `--font-testo` | Figtree | testo (400 normale, 600 per grassetti ed etichette) |

Contrasti verificati (WCAG): avorio su terracotta scuro 4.83, terracotta chiaro su blu notte 4.85, avorio su terracotta 3.73 (usato solo per testo grande o in maiuscolo grassetto).

### Convenzioni

- **Classi BEM** in italiano: `blocco__elemento--modificatore` (`progetto__logo--quadrato`).
- **Mobile first**: le regole di base sono per il telefono; le media query aggiungono il resto. Punti di rottura: `48rem` (layout a due colonne) e `64rem` (menu desktop, Impegni a due colonne).
- **Larghezza dei contenuti**: massimo `75rem`. Le sezioni usano `padding-inline: max(1.5rem, (100% - 75rem) / 2)`.
- **Varianti di sezione**: `.section--avorio`, `.section--blu`, `.section--terracotta-scuro` impostano sfondo e colore del testo.
- **Dimensioni fluide** con `clamp()` per titoli e testi.
- **Valori per elemento** passati con variabili inline nell'HTML (`style="--fuoco: center top"`, `style="--ritardo: 0.2s"`).

### Componenti

**Header**: fisso in alto, riquadro avorio. Sotto `64rem` il menu è un pannello laterale aperto dal pulsante hamburger; da `64rem` le voci sono in riga, con "Dona" come pulsante terracotta.

**Fasce**: barre di testo in maiuscolo.
- `.fascia`: laterale; parte dal bordo sinistro dello schermo grazie a `--sporgenza` (margine negativo pari allo spazio tra contenuto e bordo) e finisce dopo il testo.
- `.fascia--sospesa`: pillola centrata.
- Colori: terracotta (base), `--avorio`, `--blu`.

**Pilastri** (Dopo di noi): lista con griglia a aree nominate.
- Mobile: punto e linea a sinistra, poi nome, testo, immagine.
- Desktop: linea al centro, testo e immagine alternati a zig-zag (`:nth-child(even)`).
- La linea è il `::after` di ogni pilastro (tranne l'ultimo), lungo fino al punto del successivo; il punto è il `::before`.
- Le immagini sono ritagliate 16:9 (mobile) e 2:1 (desktop); `--fuoco` sceglie la parte da mostrare.

**Impegni**: logo SVG della casa in linea nell'HTML (porta = Lavoro, persona = Cura, tetto = Luoghi) e, sotto, tre pulsanti a schede.
- `--larghezza-logo` imposta la larghezza del logo; la riga dei pulsanti è larga `500/510` del logo, cioè quanto il tetto.
- Il testo dei pulsanti si adatta alla larghezza della loro riga (container query, unità `cqi`).
- Il `viewBox` dell'SVG è ritagliato sull'ingombro della casa (`165 -5 510 492`).

**Progetti**: carosello orizzontale con `scroll-snap`.
- Ogni scheda occupa l'88% della larghezza (si intravede la successiva).
- Foto sempre 16:9 su mobile; da `48rem` scheda a due colonne (foto | testo).
- Etichette: area (pillola terracotta) e stato (`etichetta--stato`, testo semplice).
- Logo del progetto sovrapposto in basso a sinistra; `progetto__logo--quadrato` per loghi quadrati.

**Dona**: due colonne da `48rem` (fascia e garanzie | riquadro avorio con frase, pulsante, nota, link).

**Zoom**: `<dialog>` senza cornice, sfondo blu notte quasi opaco, immagine e didascalia.

---

## Logiche JavaScript

Gli script sono caricati con `defer` (dopo la lettura dell'HTML, nell'ordine dei tag). Ogni file controlla che gli elementi esistano prima di agire. `pilastri.js`, `progetti.js`, `zoom.js`, `intro.js` e `animazioni.js` sono racchiusi in un blocco `{ }`, così le loro `const` non diventano globali.

**Progressive enhancement**: senza JavaScript tutto il contenuto è visibile e statico. Gli stati animati o interattivi si attivano solo quando lo script aggiunge una classe: `animazioni` (su `<html>`), `pilastri--animati`, `impegni--interattivo`, `intro-attiva`.

**Movimento ridotto**: con `prefers-reduced-motion: reduce` intro, comparse, linea dei pilastri e scorrimento animato non vengono attivati.

| File | Cosa fa |
|---|---|
| `menu.js` | Apre e chiude il pannello del menu cambiando `aria-expanded` sul pulsante (il CSS legge quell'attributo). Con il menu aperto rende `inert` main e footer. Chiude con Esc, clic fuori, clic su una voce, passaggio a desktop. |
| `pilastri.js` | A ogni scorrimento (limitato con `requestAnimationFrame`) calcola la soglia al 60% dello schermo. Imposta su ogni pilastro `--avanzamento` (0–1), che allunga la linea con `scaleY`; il pilastro attivo (l'ultimo superato dalla soglia) riceve `pilastro--attivo` e mostra testo e immagine. |
| `impegni.js` | Gestisce le schede ARIA: clic sui pulsanti o sulle parti del logo, frecce, Home, End. Aggiorna `aria-selected`, `tabindex`, `hidden` dei pannelli e `logo__parte--attiva` sulla parte del logo. |
| `progetti.js` | Mostra le frecce solo se ci sono più schede; le frecce scorrono alla scheda precedente o successiva; vengono disattivate agli estremi. |
| `zoom.js` | Ogni elemento con `data-zoom` apre il dialog con l'immagine che contiene e la didascalia da `data-didascalia`. Chiusura con la X, con Esc o cliccando sullo sfondo. |
| `intro.js` | Gestisce il salto dell'intro (clic o tasto). A fine animazione rimuove il sipario e invia l'evento `intro-finita`. |
| `animazioni.js` | Divide i titoli `data-scrittura` in lettere (con copia leggibile per i lettori di schermo). Con `IntersectionObserver` aggiunge `rivelato` agli elementi quando entrano nello schermo; per le fasce osserva il loro contenitore. Se l'intro è attiva, aspetta `intro-finita`. |

L'intro è decisa da uno script in linea nell'`<head>` di `index.html`, eseguito prima che la pagina venga disegnata: se in questa scheda non è ancora stata vista (`sessionStorage`, chiave `intro-vista`) e il movimento non è ridotto, aggiunge `intro-attiva`. Il sipario sfuma comunque da solo via CSS, anche se `intro.js` non si carica.

---

## Animazioni

| Effetto | Come si usa | Parametri |
|---|---|---|
| Comparsa sfumata | attributo `data-rivela` | `--ritardo` |
| Scrittura del titolo | attributo `data-scrittura` | `--velocita` (tempo per lettera), `--ritardo` |
| Fasce | automatico su `.fascia` | – |
| Pilastri | automatico su `.pilastri` | – |
| Intro | automatica, una volta per scheda | – |
| Foto della hero | automatica (dissolvenza), parte dopo l'intro | – |

Fasce: quelle laterali scorrono da sinistra (`translateX`), quelle sospese si aprono dal centro (`clip-path`); il testo compare dopo, passando da trasparente al suo colore.

---

## Accessibilità

- Lingua `it`, un solo `h1` per pagina, sezioni con `aria-labelledby`.
- Immagini decorative con `alt=""`; i pulsanti senza testo visibile hanno `aria-label`.
- Link esterni: `target="_blank" rel="noopener"` e testo nascosto "(si apre in una nuova scheda)".
- Focus visibile (`:focus-visible`) su tutti gli elementi interattivi, in terracotta su avorio e in terracotta chiaro su blu.
- Schede di Impegni secondo il modello ARIA tabs; menu con `aria-expanded`, `aria-controls` e `inert`; zoom con `<dialog>` e `showModal()`.

---

## Aggiungere un progetto

Copiare un `<article class="progetto">` dentro `#progetti-lista` e modificare:
- `aria-labelledby` e l'`id` del titolo (unici nella pagina);
- foto dentro il pulsante `progetto__zoom` (con `data-didascalia` e `aria-label`), `width`/`height` reali, eventuale `--fuoco`;
- logo facoltativo (`progetto__logo`, più `progetto__logo--quadrato` se quadrato), fuori dal pulsante;
- etichetta d'area (`etichetta--cura` / `--lavoro` / `--luoghi`) e stato (`etichetta--stato`);
- titolo, testo, link.

Le frecce del carosello compaiono da sole con più di un progetto.

---

## Flusso di lavoro

```bash
git branch --show-current     # deve essere "sviluppo"
git add .
git commit -m "Descrizione"
git push
```

Dopo il push GitHub Pages aggiorna l'anteprima (circa un minuto) e Vercel crea un'anteprima protetta; il sito pubblico non cambia.

**Messa online del sito completo**: togliere `<meta name="robots" content="noindex">` dalle pagine, unire `sviluppo` in `main` (nel conflitto su `index.html` tenere la versione di `sviluppo`), push di `main`.
