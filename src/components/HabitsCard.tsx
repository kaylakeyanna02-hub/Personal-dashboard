import { addHabit, deleteHabit, toggleHabitToday } from "@/app/actions";
import { Card } from "@/components/Card";
import type { HabitWithLog } from "@/lib/types";

export function HabitsCard({ habits }: { habits: HabitWithLog[] }) {
  return (
    <Card title="Habits">
      <form action={addHabit} className="flex gap-2">
        <input
          name="name"
          placeholder="Add a habit…"
          required
          className="flex-1 rounded-md border border-black/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-black/30 dark:border-white/10 dark:focus:border-white/30"
        />
        <button
          type="submit"
          className="rounded-md bg-foreground px-3 py-2 text-sm font-medium text-background hover:opacity-90"
        >
          Add
        </button>
      </form>

      <ul className="flex flex-col gap-2">
        {habits.length === 0 && (
          <li className="text-sm text-zinc-500 dark:text-zinc-400">No habits yet.</li>
        )}
        {habits.map((habit) => (
          <li key={habit.id} className="flex items-center gap-3">
            <form
              action={async () => {
                "use server";
                await toggleHabitToday(habit.id, !habit.done_today);
              }}
            >
              <button
                type="submit"
                aria-label={habit.done_today ? "Mark as not done today" : "Mark as done today"}
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                  habit.done_today
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : "border-black/20 dark:border-white/20"
                }`}
              >
                {habit.done_today ? "✓" : ""}
              </button>
            </form>
            <span className="flex-1 text-sm text-zinc-800 dark:text-zinc-100">{habit.name}</span>
            <span className="text-xs text-zinc-400">
              {habit.streak > 0 ? `🔥 ${habit.streak}d` : ""}
            </span>
            <form
              action={async () => {
                "use server";
                await deleteHabit(habit.id);
              }}
            >
              <button
                type="submit"
                aria-label="Delete habit"
                className="text-xs text-zinc-400 hover:text-red-500"
              >
                ✕
              </button>
            </form>
          </li>
        ))}
      </ul>
    </Card>
  );
}
