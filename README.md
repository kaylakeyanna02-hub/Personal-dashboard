# Personal Dashboard

A single-page personal dashboard built with Next.js (App Router) and a Neon
Postgres database. It tracks tasks, notes, daily habits, and expenses, plus a
row of quick links.

## Stack

- Next.js 16 (App Router, Server Components, Server Actions)
- TypeScript + Tailwind CSS
- Neon Postgres via [`@neondatabase/serverless`](https://github.com/neondatabase/serverless)

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and set `DATABASE_URL` to your Neon
   connection string (found in the Neon console under your project's
   **Connect** dialog):

   ```bash
   cp .env.example .env.local
   ```

3. Apply the schema in `db/schema.sql` to your database (via the Neon SQL
   editor, `psql`, or any Postgres client):

   ```bash
   psql "$DATABASE_URL" -f db/schema.sql
   ```

4. Run the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Project structure

- `db/schema.sql` — table definitions for tasks, notes, habits, habit_logs,
  expenses, and quick_links.
- `src/lib/db.ts` — Neon client, initialized from `DATABASE_URL`.
- `src/lib/queries.ts` — read queries used by the dashboard page.
- `src/app/actions.ts` — Server Actions for creating/updating/deleting data.
- `src/components/` — one card component per dashboard section.

## Notes

- `.env.local` holds real credentials and is git-ignored; never commit it.
