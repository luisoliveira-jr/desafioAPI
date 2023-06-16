create database netflix;

create table users(
  id serial primary key,
  username text unique not null,
  email text unique not null,
  userpassword text not null,
  profilepic text,
  isadmin boolean default false
);

create table movies(
  id serial primary key,
  title text unique not null,
  description text,
  image text,
  imagetitle text,
  imagesmall text,
  trailer text,
  video text,
  releaseyear text,
  limitage text,
  genre text,
  isseries boolean default false
);

