create table public.properties(
  id int primary key generated always as identity,
  property_name text not null,
  user_id uuid references auth.users(id) on delete cascade not null
);

alter table public.properties enable row level security;

create policy "Users can view own properties" on properties
  for select to authenticated
    using (auth.uid() = user_id);

create policy "Users can update own properties" on properties
  for update to authenticated
    using (auth.uid() = user_id);

create policy "Users can delete own properties" on properties
  for delete to authenticated
    using (auth.uid() = user_id);

