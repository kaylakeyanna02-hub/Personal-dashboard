export type Task = {
  id: number;
  title: string;
  done: boolean;
  created_at: string;
};

export type Note = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export type Habit = {
  id: number;
  name: string;
  created_at: string;
};

export type HabitWithLog = Habit & {
  done_today: boolean;
  streak: number;
};

export type Expense = {
  id: number;
  description: string;
  amount: string;
  category: string;
  spent_at: string;
  created_at: string;
};

export type QuickLink = {
  id: number;
  label: string;
  url: string;
  position: number;
};
