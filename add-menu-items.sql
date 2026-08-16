-- =========================================================
-- CITY Milliy taomlar — Namuna taomlarni qo'shish skripti
-- Bu faylni Supabase loyihangizda: SQL Editor -> New query
-- ga qo'yib, "Run" tugmasini bosing.
--
-- Eslatma: rasmlar bu yerda yo'q (image_url bo'sh qoladi, saytda
-- rasm o'rniga belgi chiqadi). Rasmlarni keyin admin paneldan
-- (/admin -> Taomlar -> tahrirlash) qo'shib chiqishingiz mumkin.
--
-- Narxlar va tavsiflar taxminiy — admin paneldan istalgancha
-- o'zgartirishingiz mumkin.
-- =========================================================

-- OSH
insert into public.menu_items (category_id, name, description, price, sort_order)
select id, 'Toshkent oshi', 'Qo''y go''shti, sabzi va guruch bilan an''anaviy palov', 45000, 1 from public.categories where name = 'Osh'
union all
select id, 'Qovurma osh', 'Qovurilgan go''sht va sabzavotlar bilan mazali palov', 40000, 2 from public.categories where name = 'Osh'
union all
select id, 'To''y oshi', 'Katta idishda tayyorlangan bayramona osh', 50000, 3 from public.categories where name = 'Osh';

-- SHASHLIK
insert into public.menu_items (category_id, name, description, price, sort_order)
select id, 'Qo''y go''shti shashlik', 'Yog'' bilan navbatlab tizilgan an''anaviy shashlik', 35000, 1 from public.categories where name = 'Shashlik'
union all
select id, 'Mol go''shti shashlik', 'Yumshoq mol go''shtidan tayyorlangan shashlik', 33000, 2 from public.categories where name = 'Shashlik'
union all
select id, 'Tovuq shashlik', 'Achchiq-chuchuk sousda marinadlangan tovuq shashlik', 28000, 3 from public.categories where name = 'Shashlik'
union all
select id, 'Jigar shashlik', 'Piyoz va ziravorlar bilan tayyorlangan jigar shashlik', 25000, 4 from public.categories where name = 'Shashlik'
union all
select id, 'Lyulya kabob', 'Maydalangan go''shtdan tayyorlangan kabob', 30000, 5 from public.categories where name = 'Shashlik';

-- SOMSA VA NON
insert into public.menu_items (category_id, name, description, price, sort_order)
select id, 'Go''shtli somsa', 'Tandirda pishirilgan qatlamali go''shtli somsa', 8000, 1 from public.categories where name = 'Somsa va non'
union all
select id, 'Kartoshkali somsa', 'Kartoshka va piyoz bilan tayyorlangan somsa', 6000, 2 from public.categories where name = 'Somsa va non'
union all
select id, 'Qiymali somsa', 'Mayda maydalangan go''sht qiymasi bilan somsa', 8000, 3 from public.categories where name = 'Somsa va non'
union all
select id, 'Patir non', 'Tandirda pishirilgan issiq patir non', 5000, 4 from public.categories where name = 'Somsa va non';

-- SALATLAR
insert into public.menu_items (category_id, name, description, price, sort_order)
select id, 'Achchiq-chuchuk salat', 'Pomidor, piyoz va ko''katlardan tayyorlangan salat', 12000, 1 from public.categories where name = 'Salatlar'
union all
select id, 'Ko''k salat', 'Yangi ko''katlar va sabzavotlardan tayyorlangan salat', 10000, 2 from public.categories where name = 'Salatlar'
union all
select id, 'Vinegret salat', 'Qaynatilgan sabzavotlar bilan tayyorlangan an''anaviy salat', 11000, 3 from public.categories where name = 'Salatlar';

-- ICHIMLIKLAR
insert into public.menu_items (category_id, name, description, price, sort_order)
select id, 'Ko''k choy', 'Choynakda dam solingan issiq ko''k choy', 5000, 1 from public.categories where name = 'Ichimliklar'
union all
select id, 'Qora choy', 'Choynakda dam solingan issiq qora choy', 5000, 2 from public.categories where name = 'Ichimliklar'
union all
select id, 'Kompot', 'Mavsumiy mevalardan tayyorlangan uy kompoti', 8000, 3 from public.categories where name = 'Ichimliklar'
union all
select id, 'Ayron', 'Sovuq va yangilantiruvchi an''anaviy ayron', 7000, 4 from public.categories where name = 'Ichimliklar';
