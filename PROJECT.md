# PROJECT.md — Loyiha xaritasi (kodni tushunish uchun)

Bu fayl loyihaning ichki tuzilishini tushuntiradi: keyinchalik biror narsani
o'zgartirmoqchi bo'lsangiz, qaysi faylga borishni shu yerdan tez topasiz.
O'rnatish (Supabase, Vercel) bo'yicha qadamlar uchun **README.md** ga qarang —
bu fayl faqat kod tuzilishi haqida.

---

## 1. Texnologiyalar

| Qism | Texnologiya |
|---|---|
| Frontend | React 19 + Vite |
| Stil | Tailwind CSS v4 (`@theme` orqali ranglar/shriftlar sozlangan) |
| Marshrutlash | react-router-dom |
| Baza + Auth + Fayl saqlash | Supabase |
| Deploy | Vercel |
| Ikonkalar | lucide-react |

---

## 2. Papka tuzilishi

```
src/
├── App.jsx                  # Barcha sahifa yo'llari (routes) shu yerda
├── main.jsx                 # React kirish nuqtasi
├── index.css                # Global stil, ranglar, shriftlar (@theme)
├── lib/
│   ├── supabase.js          # Supabase klient (URL/kalit shu yerdan olinadi)
│   └── cropImage.js         # Yuklangan rasmni kvadrat (1:1) shaklga keltirish
├── context/
│   └── AuthContext.jsx      # Admin login holati (session) butun saytda shu orqali ulashiladi
├── components/
│   ├── Header.jsx            # Yuqori navigatsiya (logo, menyu havolalari, telefon)
│   ├── Hero.jsx               # Bosh sahifa banneri (logotip, sarlavha, tugmalar)
│   ├── About.jsx               # "Biz haqimizda" bo'limi
│   ├── MenuSection.jsx          # To'liq menyu: Supabase'dan taomlarni yuklaydi
│   ├── CategoryTabs.jsx          # Kategoriya tugmalari ("Hammasi" + har bir kategoriya)
│   ├── MenuCard.jsx                # Bitta taomning kartochkasi (rasm, nomi, narxi)
│   ├── Footer.jsx                    # Pastki qism: kontakt, ish vaqti, admin havolasi
│   ├── ArchFrieze.jsx                 # Dekorativ SVG chiziq (gumbaz motividagi bezak)
│   ├── ImageUploader.jsx               # Admin formadagi rasm yuklash komponenti
│   ├── ProtectedRoute.jsx               # /admin sahifasini faqat login qilganlarga ochadi
│   └── admin/
│       ├── CategoryManager.jsx          # Kategoriya qo'shish/tahrirlash/o'chirish/tartiblash
│       ├── MenuItemManager.jsx          # Taomlar ro'yxati, filter, o'chirish, "mavjud" belgisi
│       └── MenuItemForm.jsx             # Taom qo'shish/tahrirlash formasi (modal oyna)
├── pages/
│   ├── Home.jsx                        # Bosh sahifani yig'adi (Header+Hero+About+Menu+Footer)
│   ├── NotFound.jsx                     # 404 sahifa
│   └── admin/
│       ├── AdminLogin.jsx               # Login sahifasi
│       └── AdminDashboard.jsx           # Admin panel (Taomlar / Kategoriyalar tablari)
supabase-setup.sql                       # Bazani bir martalik sozlash skripti
vercel.json                              # Vercel uchun yo'l sozlamasi (SPA rewrite)
```

---

## 3. Ma'lumotlar bazasi (Supabase)

Ikkita jadval bor, `supabase-setup.sql` faylida to'liq ta'rifi bor:

**`categories`** — menyu bo'limlari (Osh, Shashlik va h.k.)
- `id`, `name`, `sort_order` (tartib raqami)

**`menu_items`** — har bir taom
- `id`, `category_id` (qaysi kategoriyaga tegishli)
- `name`, `description`, `price`
- `image_url` (Supabase Storage'dagi rasm havolasi)
- `is_available` (false bo'lsa saytda "Tugadi" deb ko'rsatiladi, lekin o'chirilmaydi)
- `sort_order`

Rasmlar **`menu-images`** nomli Storage bucket'da saqlanadi (ochiq/public).

**Xavfsizlik (RLS):** hamma (mehmonlar) faqat o'qiy oladi; faqat Supabase
Authentication'da yaratilgan (login qilgan) foydalanuvchilargina qo'sha/
tahrirlay/o'chira oladi.

---

## 4. Odatiy o'zgartirishlar — qaysi faylga borish kerak

| Nima o'zgartirmoqchisiz? | Qaysi fayl |
|---|---|
| Telefon raqami yoki Instagram havolasi | `Header.jsx`, `Footer.jsx` |
| Ish vaqti | `Footer.jsx` (hozircha qattiq yozilgan, bazadan emas) |
| Bosh sahifadagi sarlavha/matn | `Hero.jsx` |
| "Biz haqimizda" matni | `About.jsx` |
| Ranglar, shriftlar | `index.css` (`@theme` bo'limi) |
| Logotip rasmi | `public/logo.png` faylini almashtiring |
| Admin panelga yangi maydon qo'shish (masalan "ingredientlar") | 1) `supabase-setup.sql`ga ustun qo'shing va Supabase'da qo'lda ishga tushiring, 2) `MenuItemForm.jsx`ga input qo'shing, 3) `MenuCard.jsx`da ko'rsating |
| Yangi sahifa qo'shish | `src/pages/` ga yangi fayl, so'ng `App.jsx`da `<Route>` qo'shing |
| SEO/ijtimoiy tarmoq preview matni | `index.html` (`<meta property="og:...">`) |

---

## 5. Muhim eslatmalar

- **`.env` fayli hech qachon Git'ga yuklanmaydi** (`.gitignore`da). Supabase
  kalitlarini faqat Vercel'ning "Environment Variables" bo'limida saqlang.
- Rasm o'chirilganda yoki almashtirilganda eskisi Supabase Storage'dan ham
  avtomatik o'chiriladi (bepul limitni tejash uchun) — `MenuItemManager.jsx`
  va `MenuItemForm.jsx`da amalga oshirilgan.
- Kategoriya o'chirilsa, ichidagi **barcha taomlar ham o'chib ketadi**
  (baza darajasida `ON DELETE CASCADE`) — admin panelda buni ogohlantiruvchi
  tasdiqlash bor.
- Build tekshirish: `npm run build`. Kod sifatini tekshirish: `npm run lint`
  (yoki `npx oxlint`).
