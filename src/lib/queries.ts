import { sql } from "@/lib/db";
import type { Expense, HabitWithLog, Note, QuickLink, Task } from "@/lib/types";

export async function getTasks(): Promise<Task[]> {
  return (await sql`SELECT * FROM tasks ORDER BY done ASC, created_at DESC`) as Task[];
}

export async function getNotes(): Promise<Note[]> {
  return (await sql`SELECT * FROM notes ORDER BY updated_at DESC`) as Note[];
}

export async function getHabitsWithTodayStatus(): Promise<HabitWithLog[]> {
  const rows = (await sql`
    SELECT
      h.id,
      h.name,
      h.created_at,
      EXISTS (
        SELECT 1 FROM habit_logs hl
        WHERE hl.habit_id = h.id AND hl.log_date = CURRENT_DATE
      ) AS done_today
    FROM habits h
    ORDER BY h.created_at ASC
  `) as (Omit<HabitWithLog, "streak">)[];

  const habitsWithStreak: HabitWithLog[] = [];
  for (const habit of rows) {
    const logs = (await sql`
      SELECT log_date FROM habit_logs
      WHERE habit_id = ${habit.id}
      ORDER BY log_date DESC
    `) as { log_date: string }[];

    let streak = 0;
    const cursor = new Date();
    cursor.setHours(0, 0, 0, 0);
    const logDates = new Set(logs.map((l) => l.log_date));
    while (logDates.has(cursor.toISOString().slice(0, 10))) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }

    habitsWithStreak.push({ ...habit, streak });
  }

  return habitsWithStreak;
}

export async function getRecentExpenses(limit = 10): Promise<Expense[]> {
  return (await sql`
    SELECT * FROM expenses ORDER BY spent_at DESC, created_at DESC LIMIT ${limit}
  `) as Expense[];
}

export async function getMonthlyExpenseTotal(): Promise<number> {
  const rows = (await sql`
    SELECT COALESCE(SUM(amount), 0) AS total
    FROM expenses
    WHERE date_trunc('month', spent_at) = date_trunc('month', CURRENT_DATE)
  `) as { total: string }[];
  return Number(rows[0]?.total ?? 0);
}

export async function getQuickLinks(): Promise<QuickLink[]> {
  return (await sql`SELECT * FROM quick_links ORDER BY position ASC`) as QuickLink[];
}
