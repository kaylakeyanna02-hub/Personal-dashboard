import { addQuickLink, deleteQuickLink } from "@/app/actions";
import { Card } from "@/components/Card";
import type { QuickLink } from "@/lib/types";

export function QuickLinksCard({ links }: { links: QuickLink[] }) {
  return (
    <Card title="Quick Links">
      <form action={addQuickLink} className="flex gap-2">
        <input
          name="label"
          placeholder="Label…"
          required
          className="w-24 rounded-md border border-black/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-black/30 dark:border-white/10 dark:focus:border-white/30"
        />
        <input
          name="url"
          type="url"
          placeholder="https://…"
          required
          className="min-w-0 flex-1 rounded-md border border-black/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-black/30 dark:border-white/10 dark:focus:border-white/30"
        />
        <button
          type="submit"
          className="rounded-md bg-foreground px-3 py-2 text-sm font-medium text-background hover:opacity-90"
        >
          Add
        </button>
      </form>

      <ul className="flex flex-wrap gap-2">
        {links.length === 0 && (
          <li className="text-sm text-zinc-500 dark:text-zinc-400">No links yet.</li>
        )}
        {links.map((link) => (
          <li
            key={link.id}
            className="group flex items-center gap-2 rounded-full border border-black/10 px-3 py-1.5 text-sm dark:border-white/10"
          >
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {link.label}
            </a>
            <form
              action={async () => {
                "use server";
                await deleteQuickLink(link.id);
              }}
            >
              <button
                type="submit"
                aria-label="Delete link"
                className="text-xs text-zinc-400 opacity-0 group-hover:opacity-100 hover:text-red-500"
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
