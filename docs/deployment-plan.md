'Plan de punere în producție — student-productivty-app'

Autor: vvv13vvv13
Data: 18 Decembrie 2025

1. Scop
Aplicatia este un prototip Next.js pentru productivitate studențească. Scopul acestui document este să descrie pașii concreți pentru a pune aplicația în producție (deploy), verificările și procedura de rollback.

2. Funcționalități principale
- Meniu principal cu pagini: Orar, Taskuri, Taskuri completate, Log in, Puncte, Magazin, Materiale de curs, Personalizare.
- Magazin / Puncte: cumpărări salvate în localStorage.
- Personalizare temă: culori salvate în localStorage.
- Buton „Înapoi” centralizat (componentă `BackButton`).

3. Cerințe de mediu
- Node.js >= 18
- npm (sau pnpm/yarn)

4. Pași pentru rulare locală (dezvoltare)
1. Clone:
   - `git clone https://github.com/vvv13vvv13/student-productivty-app.git`
   - `cd student-productivty-app`
2. Instalează dependențe: `npm install`
3. Rulează în modul dezvoltare: `npm run dev`
4. Deschide în browser: `http://localhost:3000`

5. Plan de deploy (Vercel) — pași simpli
1. (Opțional) Creați cont Vercel sau folosiți cont existent.
2. Conectare Vercel la GitHub (repo public) — activare deploy din branch `main`.
3. Setări: folosiți branch `main` pentru production.
4. Trigger: la fiecare push către `main`, Vercel va rula build automat (`npm run build`).

Comenzi manuale cu Vercel CLI (dacă folosiți CLI):
```powershell
npx vercel login           # dacă nu sunteți logat
npx vercel --prod         # deploy în production
```

6. Pași de verificare (post-deploy)
- Verificați endpoint-ul live (pagina principală și paginile cheie: /inventar, /magazin, /theme-picker).
- Testați funcționalități: cumpărare în magazin (scade punctele), salvare temă, buton Înapoi.
- Verificați consola build-ului din Vercel pentru erori.

7. Plan de rollback
- Dacă apare bug sever, reveniți la commit-ul anterior din Vercel (redeploy de la commit anterior din dashboard) sau refaceți push la commit stabil.

8. Backup & date
- Datele aplicatiei (puncte, owned items, user) sunt salvate în `localStorage` — nu există DB în acest prototip.

9. Contact & Responsabilități
- Autor / contact: vvv13vvv13 (adăugați email)

10. Notă finală
Acest document e conceput să fie scurt și clar — în cazul unui deploy real la scară, ar trebui să adăugați monitorizare, backup DB, CI/CD testare automată și proceduri de securitate pentru secrete.
