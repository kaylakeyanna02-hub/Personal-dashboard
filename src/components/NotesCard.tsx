import { addNote, deleteNote } from "@/app/actions";
import { Card } from "@/components/Card";
import type { Note } from "@/lib/types";

export function NotesCard({ notes }: { notes: Note[] }) {
  return (
    <Card title="Notes">
      <form action={addNote} className="flex flex-col gap-2">
        <input
          name="title"
          placeholder="Note title…"
          required
          className="rounded-md border border-black/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-black/30 dark:border-white/10 dark:focus:border-white/30"
        />
        <textarea
          name="content"
          placeholder="Write something…"
          rows={2}
          className="resize-none rounded-md border border-black/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-black/30 dark:border-white/10 dark:focus:border-white/30"
        />
        <button
          type="submit"
          className="self-start rounded-md bg-foreground px-3 py-2 text-sm font-medium text-background hover:opacity-90"
        >
          Save note
        </button>
      </form>

      <ul className="flex flex-col gap-3">
        {notes.length === 0 && (
          <li className="text-sm text-zinc-500 dark:text-zinc-400">No notes yet.</li>
        )}
        {notes.map((note) => (
          <li
            key={note.id}
            className="flex items-start justify-between gap-3 rounded-md border border-black/5 p-3 dark:border-white/5"
          >
            <div>
              <p className="text-sm font-medium text-zinc-800 dark:text-zinc-100">{note.title}</p>
              {note.content && (
                <p className="mt-1 whitespace-pre-wrap text-sm text-zinc-500 dark:text-zinc-400">
                  {note.content}
                </p>
              )}
            </div>
            <form
              action={async () => {
                "use server";
                await deleteNote(note.id);
              }}
            >
              <button
                type="submit"
                aria-label="Delete note"
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
