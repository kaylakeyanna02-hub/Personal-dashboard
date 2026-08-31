"use server";

import { revalidatePath } from "next/cache";
import { sql } from "@/lib/db";

function requireString(formData: FormData, key: string): string {
  const value = formData.get(key);
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${key} is required`);
  }
  return value.trim();
}

export async function addTask(formData: FormData) {
  const title = requireString(formData, "title");
  await sql`INSERT INTO tasks (title) VALUES (${title})`;
  revalidatePath("/");
}

export async function toggleTask(id: number, done: boolean) {
  await sql`UPDATE tasks SET done = ${done} WHERE id = ${id}`;
  revalidatePath("/");
}

export async function deleteTask(id: number) {
  await sql`DELETE FROM tasks WHERE id = ${id}`;
  revalidatePath("/");
}

export async function addNote(formData: FormData) {
  const title = requireString(formData, "title");
  const content = (formData.get("content") as string | null)?.trim() ?? "";
  await sql`INSERT INTO notes (title, content) VALUES (${title}, ${content})`;
  revalidatePath("/");
}

export async function deleteNote(id: number) {
  await sql`DELETE FROM notes WHERE id = ${id}`;
  revalidatePath("/");
}

export async function addHabit(formData: FormData) {
  const name = requireString(formData, "name");
  await sql`INSERT INTO habits (name) VALUES (${name}) ON CONFLICT (name) DO NOTHING`;
  revalidatePath("/");
}

export async function toggleHabitToday(habitId: number, doneToday: boolean) {
  if (doneToday) {
    await sql`
      INSERT INTO habit_logs (habit_id, log_date)
      VALUES (${habitId}, CURRENT_DATE)
      ON CONFLICT (habit_id, log_date) DO NOTHING
    `;
  } else {
    await sql`DELETE FROM habit_logs WHERE habit_id = ${habitId} AND log_date = CURRENT_DATE`;
  }
  revalidatePath("/");
}

export async function deleteHabit(id: number) {
  await sql`DELETE FROM habits WHERE id = ${id}`;
  revalidatePath("/");
}

export async function addExpense(formData: FormData) {
  const description = requireString(formData, "description");
  const amountRaw = requireString(formData, "amount");
  const amount = Number(amountRaw);
  if (Number.isNaN(amount) || amount <= 0) {
    throw new Error("amount must be a positive number");
  }
  const category = (formData.get("category") as string | null)?.trim() || "general";
  await sql`
    INSERT INTO expenses (description, amount, category)
    VALUES (${description}, ${amount}, ${category})
  `;
  revalidatePath("/");
}

export async function deleteExpense(id: number) {
  await sql`DELETE FROM expenses WHERE id = ${id}`;
  revalidatePath("/");
}

export async function addQuickLink(formData: FormData) {
  const label = requireString(formData, "label");
  const url = requireString(formData, "url");
  await sql`
    INSERT INTO quick_links (label, url, position)
    VALUES (${label}, ${url}, (SELECT COALESCE(MAX(position), 0) + 1 FROM quick_links))
  `;
  revalidatePath("/");
}

export async function deleteQuickLink(id: number) {
  await sql`DELETE FROM quick_links WHERE id = ${id}`;
  revalidatePath("/");
}
