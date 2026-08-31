import { addExpense, deleteExpense } from "@/app/actions";
import { Card } from "@/components/Card";
import type { Expense } from "@/lib/types";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export function ExpensesCard({
  expenses,
  monthlyTotal,
}: {
  expenses: Expense[];
  monthlyTotal: number;
}) {
  return (
    <Card title="Expenses">
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        This month: <span className="font-semibold text-zinc-800 dark:text-zinc-100">{currency.format(monthlyTotal)}</span>
      </p>

      <form action={addExpense} className="flex flex-wrap gap-2">
        <input
          name="description"
          placeholder="Description…"
          required
          className="min-w-0 flex-1 rounded-md border border-black/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-black/30 dark:border-white/10 dark:focus:border-white/30"
        />
        <input
          name="amount"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          required
          className="w-24 rounded-md border border-black/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-black/30 dark:border-white/10 dark:focus:border-white/30"
        />
        <input
          name="category"
          placeholder="Category"
          className="w-28 rounded-md border border-black/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-black/30 dark:border-white/10 dark:focus:border-white/30"
        />
        <button
          type="submit"
          className="rounded-md bg-foreground px-3 py-2 text-sm font-medium text-background hover:opacity-90"
        >
          Add
        </button>
      </form>

      <ul className="flex flex-col gap-2">
        {expenses.length === 0 && (
          <li className="text-sm text-zinc-500 dark:text-zinc-400">No expenses logged yet.</li>
        )}
        {expenses.map((expense) => (
          <li key={expense.id} className="flex items-center gap-3 text-sm">
            <span className="flex-1 text-zinc-800 dark:text-zinc-100">{expense.description}</span>
            <span className="rounded-full bg-black/5 px-2 py-0.5 text-xs text-zinc-500 dark:bg-white/10 dark:text-zinc-400">
              {expense.category}
            </span>
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              {currency.format(Number(expense.amount))}
            </span>
            <form
              action={async () => {
                "use server";
                await deleteExpense(expense.id);
              }}
            >
              <button
                type="submit"
                aria-label="Delete expense"
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
