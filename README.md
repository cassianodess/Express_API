# Express Rest API + Postgresql

This is a simple repository to train my Express + Node skills.

## SETUP

1. Copy `.env.example` > `.env` and correctly feed your environment variables.
1. In your Postgres SGBD, run the bellow commands:
  ```
  create database school;
  create table students(id SERIAL, name varchar not null, course varchar not null );
  create table teachers(id SERIAL, name varchar not null, subject varchar not null );
  ```
1. Open your terminal within directory project and run `npm start` to serve.
1. Check the `specifications` folder to make sure you are making the right requests.