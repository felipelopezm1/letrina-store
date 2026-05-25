create extension if not exists "pgcrypto";

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  tagline text,
  description text,
  min_price integer not null check (min_price >= 1000),
  suggested integer not null check (suggested >= min_price),
  cover_url text,
  gallery text[] default '{}',
  tags text[] default '{}',
  tech_stack text[] default '{}',
  storage_path text not null,
  file_name text not null,
  file_size bigint,
  version text default '0.1.0',
  is_published boolean default true,
  created_at timestamptz default now()
);

create table if not exists purchases (
  id text primary key,
  product_id uuid references products(id),
  stripe_session_id text unique,
  amount_paid integer not null,
  currency text default 'gbp',
  buyer_email text not null,
  downloads_used integer default 0,
  max_downloads integer default 5,
  created_at timestamptz default now()
);

create table if not exists download_logs (
  id bigserial primary key,
  purchase_id text references purchases(id),
  downloaded_at timestamptz default now(),
  ip_hash text,
  ua text
);

create or replace function claim_download(
  purchase_id_input text,
  ip_hash_input text,
  ua_input text
)
returns table (
  id text,
  downloads_used integer,
  max_downloads integer,
  products jsonb
)
language plpgsql
security definer
as $$
begin
  return query
  with claimed as (
    update purchases p
      set downloads_used = p.downloads_used + 1
      where p.id = purchase_id_input
        and p.downloads_used < p.max_downloads
      returning p.*
  ),
  logged as (
    insert into download_logs (purchase_id, ip_hash, ua)
    select claimed.id, ip_hash_input, ua_input
    from claimed
    returning purchase_id
  )
  select
    claimed.id,
    claimed.downloads_used,
    claimed.max_downloads,
    jsonb_build_object(
      'storage_path', products.storage_path,
      'file_name', products.file_name
    ) as products
  from claimed
  join products on products.id = claimed.product_id;
end;
$$;
