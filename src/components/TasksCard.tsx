import { addTask, deleteTask, toggleTask } from "@/app/actions";
import { Card } from "@/components/Card";
import type { Task } from "@/lib/types";

export function TasksCard({ tasks }: { tasks: Task[] }) {
  return (
    <Card title="Tasks">
      <form action={addTask} className="flex gap-2">
        <input
          name="title"
          placeholder="Add a task…"
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
        {tasks.length === 0 && (
          <li className="text-sm text-zinc-500 dark:text-zinc-400">No tasks yet.</li>
        )}
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center gap-3">
            <form
              action={async () => {
                "use server";
                await toggleTask(task.id, !task.done);
              }}
            >
              <button
                type="submit"
                aria-label={task.done ? "Mark as not done" : "Mark as done"}
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                  task.done
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : "border-black/20 dark:border-white/20"
                }`}
              >
                {task.done ? "✓" : ""}
              </button>
            </form>
            <span
              className={`flex-1 text-sm ${
                task.done ? "text-zinc-400 line-through" : "text-zinc-800 dark:text-zinc-100"
              }`}
            >
              {task.title}
            </span>
            <form
              action={async () => {
                "use server";
                await deleteTask(task.id);
              }}
            >
              <button
                type="submit"
                aria-label="Delete task"
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
