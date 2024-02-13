create table public.bookings(
  id int primary key generated always as identity,
  guest_name text not null,
  startOnDay date not null,
  endOnDay date not null,
  color text not null,
  created_at timestamptz default now(),
  user_id uuid references auth.users(id) on delete cascade not null
);

alter table public.bookings enable row level security;

create policy "Users can view own bookings" on bookings
  for select to authenticated
    using (auth.uid() = user_id);

create policy "Users can update own bookings" on bookings
  for update to authenticated
    using (auth.uid() = user_id);

create policy "Users can delete own bookings" on bookings
  for delete to authenticated
    using (auth.uid() = user_id);

