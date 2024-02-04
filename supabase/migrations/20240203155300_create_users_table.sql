create table public.bookings(
  id int primary key generated always as identity,
  guest_name text not null,
  startOnDay date not null,
  endOnDay date not null,
  color text not null,
  created_at timestamptz default now()
);

alter table public.bookings enable row level security;

