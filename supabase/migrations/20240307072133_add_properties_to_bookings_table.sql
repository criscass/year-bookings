alter table bookings
  add property_id int references public.properties(id) on delete cascade not null;

