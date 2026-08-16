-- =========================================================
-- CITY Milliy taomlar — Supabase sozlash skripti
-- Bu faylni Supabase loyihangizda: SQL Editor -> New query
-- ga qo'yib, "Run" tugmasini bosing.
-- =========================================================

-- 1) KATEGORIYALAR jadvali
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- 2) TAOMLAR (menyu elementlari) jadvali
create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete cascade,
  name text not null,
  description text,
  price numeric,
  image_url text,
  is_available boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- 3) Xavfsizlik (Row Level Security) yoqiladi
alter table public.categories enable row level security;
alter table public.menu_items enable row level security;

-- Hammaga (saytga kirgan har bir mehmonga) o'qishga ruxsat
drop policy if exists "Public can read categories" on public.categories;
create policy "Public can read categories"
  on public.categories for select
  to anon, authenticated
  using (true);

drop policy if exists "Public can read menu_items" on public.menu_items;
create policy "Public can read menu_items"
  on public.menu_items for select
  to anon, authenticated
  using (true);

-- Faqat tizimga kirgan (login qilgan) admin qo'sha/o'zgartira/o'chira oladi
drop policy if exists "Authenticated can manage categories" on public.categories;
create policy "Authenticated can manage categories"
  on public.categories for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated can manage menu_items" on public.menu_items;
create policy "Authenticated can manage menu_items"
  on public.menu_items for all
  to authenticated
  using (true)
  with check (true);

-- 4) Rasm saqlash uchun Storage bucket ("menu-images")
insert into storage.buckets (id, name, public)
values ('menu-images', 'menu-images', true)
on conflict (id) do nothing;

-- Hamma rasmlarni ko'ra oladi (ochiq/public bucket)
drop policy if exists "Public can view menu images" on storage.objects;
create policy "Public can view menu images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'menu-images');

-- Faqat tizimga kirgan admin rasm yuklay oladi
drop policy if exists "Authenticated can upload menu images" on storage.objects;
create policy "Authenticated can upload menu images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'menu-images');

drop policy if exists "Authenticated can update menu images" on storage.objects;
create policy "Authenticated can update menu images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'menu-images');

drop policy if exists "Authenticated can delete menu images" on storage.objects;
create policy "Authenticated can delete menu images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'menu-images');

-- 5) Namuna kategoriyalar (xohlasangiz o'chirib, o'zingiznikini qo'shing)
insert into public.categories (name, sort_order) values
  ('Osh', 1),
  ('Shashlik', 2),
  ('Somsa va non', 3),
  ('Salatlar', 4),
  ('Ichimliklar', 5)
on conflict do nothing;
