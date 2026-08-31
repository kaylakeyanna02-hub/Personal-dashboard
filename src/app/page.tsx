import { ExpensesCard } from "@/components/ExpensesCard";
import { HabitsCard } from "@/components/HabitsCard";
import { NotesCard } from "@/components/NotesCard";
import { QuickLinksCard } from "@/components/QuickLinksCard";
import { TasksCard } from "@/components/TasksCard";
import {
  getHabitsWithTodayStatus,
  getMonthlyExpenseTotal,
  getNotes,
  getQuickLinks,
  getRecentExpenses,
  getTasks,
} from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [tasks, notes, habits, expenses, monthlyTotal, links] = await Promise.all([
    getTasks(),
    getNotes(),
    getHabitsWithTodayStatus(),
    getRecentExpenses(),
    getMonthlyExpenseTotal(),
    getQuickLinks(),
  ]);

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-full bg-zinc-50 dark:bg-black">
      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10">
        <header>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Personal Dashboard
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{today}</p>
        </header>

        <QuickLinksCard links={links} />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <TasksCard tasks={tasks} />
          <NotesCard notes={notes} />
          <HabitsCard habits={habits} />
          <ExpensesCard expenses={expenses} monthlyTotal={monthlyTotal} />
        </div>
      </main>
    </div>
  );
}
