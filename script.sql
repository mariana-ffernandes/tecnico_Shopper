drop schema if exists shopper cascade;

create schema shopper;

create table shopper.measures (
  measure_uuid uuid primary key,
  customer_code text not null,
  measure_datetime text not null,
  measure_type text not null,
  has_confirmed boolean not null default false,
  image_url text null,
  measure_value integer not null default 0
);