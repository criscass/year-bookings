create table
bookings (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  guest_name TEXT NOT NULL,
  startOnDay DATE NOT NULL,
  endOnDay DATE NOT NULL,
  color TEXT NOT NULL,
  created_at timestamptz default now()
);