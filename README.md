# CITY Milliy taomlar — sayt va admin panel

O'zbek milliy taomlari restorani uchun to'liq sayt: chiroyli asosiy sahifa + to'liq menyu + admin panel
(taom qo'shish, tahrirlash, o'chirish, rasm yuklash — rasm avtomatik kvadrat shaklga keltiriladi).

- **Frontend:** React + Vite + Tailwind CSS
- **Backend/Baza:** Supabase (Postgres + Auth + Storage)
- **Deploy:** Vercel

---

## 1-qadam: Supabase loyihasini sozlash

1. https://supabase.com ga kiring, akkaunt oching va **New project** tugmasi orqali yangi loyiha yarating.
2. Loyiha tayyor bo'lgach, chap menyudan **SQL Editor** ga o'ting.
3. Ushbu papkadagi **`supabase-setup.sql`** faylining butun tarkibini nusxalab, SQL Editor ichiga joylashtiring va **Run** tugmasini bosing.
   - Bu jadvallarni (`categories`, `menu_items`), xavfsizlik qoidalarini (RLS) va rasm saqlash uchun `menu-images` bucket'ni avtomatik yaratadi.
   - Shuningdek 5 ta namuna kategoriya (Osh, Shashlik, Somsa va non, Salatlar, Ichimliklar) qo'shiladi — buni admin panelda o'zgartira olasiz.
4. Chap menyudan **Project Settings -> API** ga o'ting va quyidagilarni nusxalab oling:
   - **Project URL**
   - **anon public** kaliti

### Admin uchun login yaratish

1. Supabase panelida **Authentication -> Users** bo'limiga o'ting.
2. **Add user -> Create new user** tugmasini bosing.
3. Email va parol kiriting (masalan: `admin@city.uz` va kuchli parol) — shu email/parol bilan siz `/admin/login` sahifasidan kirasiz.
4. "Auto Confirm User" katagini belgilang (email tasdiqlashni chetlab o'tish uchun).

> Admin panelga faqat shu tarzda Supabase'da yaratilgan foydalanuvchilar kira oladi. Xohlagancha admin qo'shishingiz mumkin.

---

## 2-qadam: Loyihani mahalliy kompyuterda ishga tushirish (ixtiyoriy)

```bash
npm install
cp .env.example .env
```

`.env` faylini oching va Supabase'dan olgan qiymatlarni kiriting:

```
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Keyin:

```bash
npm run dev
```

Sayt `http://localhost:5173` da ochiladi, admin panel esa `http://localhost:5173/admin/login`.

---

## 3-qadam: Vercel'ga joylashtirish (deploy)

1. Ushbu loyiha papkasini GitHub'ga yuklang (yangi repository yarating va push qiling).
2. https://vercel.com ga kiring -> **Add New -> Project** -> GitHub repositoryingizni tanlang.
3. Vercel avtomatik Vite loyihasini aniqlaydi (Build command: `vite build`, Output: `dist`) — hech narsa o'zgartirish shart emas.
4. **Environment Variables** bo'limiga quyidagilarni qo'shing:
   - `VITE_SUPABASE_URL` — Supabase Project URL
   - `VITE_SUPABASE_ANON_KEY` — Supabase anon public kalit
5. **Deploy** tugmasini bosing. Bir necha daqiqadan so'ng saytingiz tayyor bo'ladi (masalan `city-milliy-taomlar.vercel.app`).

`vercel.json` fayli allaqachon qo'shilgan — bu `/admin` kabi sahifalar to'g'ri ishlashi uchun kerak.

---

## Admin panelni ishlatish

1. `sizning-domeningiz.vercel.app/admin/login` ga kiring.
2. Yuqorida yaratilgan email va parol bilan tizimga kiring.
3. **Kategoriyalar** bo'limida menyu bo'limlarini (Osh, Shashlik, va h.k.) qo'shing/tahrirlang/tartiblang.
4. **Taomlar** bo'limida **"Yangi taom"** tugmasi orqali taom qo'shing:
   - Nomi, tavsifi, narxi, kategoriyasini kiriting
   - Rasm tanlang — **istalgan o'lchamdagi rasm avtomatik ravishda kvadrat (1:1) shaklga markazdan kesib olinadi**, shuning uchun barcha rasmlar menyuda bir xil, tartibli ko'rinadi
   - "Hozirda mavjud" belgisini olib tashlasangiz, taom saytda "Tugadi" deb ko'rsatiladi, lekin o'chirilmaydi
5. Barcha o'zgarishlar saytda **darhol** ko'rinadi — sahifani qayta yig'ish (rebuild) shart emas.

---

## Sayt tuzilishi

- `/` — Asosiy sahifa: hero, biz haqimizda, to'liq menyu, bog'lanish
- `/admin/login` — Admin kirish sahifasi
- `/admin` — Admin panel (faqat tizimga kirganlar uchun)

## Kontakt ma'lumotlari (saytga qattiq kiritilgan)

- Telefon: **+998 95 260 40 40**
- Instagram: **@city_milliy_taomlari**

Bu ma'lumotlarni o'zgartirish uchun `src/components/Header.jsx` va `src/components/Footer.jsx` fayllarini tahrirlang.
