# student-productivty-app ✅

> Aplicație Next.js pentru productivitate studențească — meniuri, puncte, magazin și personalizare.

---

## 📋 Descriere scurtă
**student-productivty-app** este o aplicație front-end construită cu **Next.js** care oferă funcționalități simple pentru organizarea taskurilor, vizualizarea orarului, gestiunea unui inventar / magazin virtual (cu puncte) și personalizarea temei.

---

## 🚀 Cum rulezi local (dezvoltare)
1. Clonează repo (dacă nu ai făcut-o):

```powershell
git clone <URL-UL-REPO-ULUI-TĂU>
cd student-productivty-app
```

2. Instalează dependențele și pornește serverul de dezvoltare:

```powershell
npm install
npm run dev
```

3. Deschide aplicația în browser la: `http://localhost:3000` ✅

---

## 🧭 Structura proiectului (pe scurt)
- `app/` – paginile aplicației (Next.js App Router)
	- `page.tsx` – pagina principală
	- `login/`, `inventar/`, `magazin/`, `puncte/`, `materiale/`, `taskuri/`, `theme-picker/` – pagini principale
	- `components/` – componente reutilizabile (`BackButton.tsx`, `Sidebar.tsx`, ...)
- `public/` – fișiere publice (imagini etc.)
- `app/globals.css` – stiluri globale
- `package.json` – scripturi și dependențe

---

## ✨ Funcționalități importante
- Navigare între pagini prin meniul principal (`Sidebar`).
- Magazin / puncte: cumpărarea de elemente care se salvează în `localStorage`.
- Personalizare temă: schimbă culorile aplicației, salvează tema în `localStorage`.
- Buton „Înapoi” (Back) implementat centralizat în `app/components/BackButton.tsx` — îl poți folosi în orice pagină cu:

```tsx
import BackButton from '../components/BackButton';
// sau din root: import BackButton from './components/BackButton';

<BackButton />                          // poziție implicită: stânga sus
<BackButton position="bottom" />      // poziție: stânga jos
<BackButton label="← Back to Main" /> // text personalizat
```

---

## 🛠️ Cum modifici stilul / poziția butonului „Înapoi”
- Stilurile globale sunt în `app/globals.css`.
- Clase utile:
	- `.back-top-left` – poziționează butonul în stânga-sus
	- `.back-bottom-left` – poziționează butonul în stânga-jos
- Pentru a schimba poziția pe o pagină, modifică propul `position` la componenta `BackButton`.

---

## ✅ Git: commit & push (pași rapizi)
După ce faci modificări locale:

```powershell
git add .
git commit -m "Mesaj clar: Ce ai modificat"
git push origin main
```

Dacă `git push` e respins (remote are comiteri noi):

```powershell
git pull --rebase origin main
# rezolvă conflictele dacă apar
git push origin main
```

Verifică statusul rapid:
```powershell
git status --short
git log --oneline -n 5
```

---

## 🐞 Debug & sfaturi rapide
- Dacă nu vezi modificările pe GitHub după `push`: verifică pagina de `Commits` din repo-ul tău pe GitHub.
- Dacă ai fișiere noi care apar colorate în Explorer: verde = fișier nou (necomitat), portocaliu = modificat (necomitat).
- Pentru autentificare la push folosește GitHub Personal Access Token (PAT) în loc de parolă dacă ți se cere.

---

## 🧩 Contribuții
1. Fork → clone → branch nou
2. Creează un branch: `git checkout -b feature/numele-tau`
3. Modifică, testează local
4. `git add . && git commit -m "descriere" && git push origin feature/numele-tau`
5. Deschide Pull Request pe GitHub

---

## 📄 Licență
Adaugă aici licența proiectului (ex: MIT).

---


