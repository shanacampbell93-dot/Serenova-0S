export type Priority = "high" | "med" | "low";
export type Stage = "idea" | "research" | "drafting" | "scheduled" | "published";

export interface Note {
  id: string;
  title: string;
  body: string;
  tags: string[];
  createdAt: string;      // ISO date
  contentId?: string;     // set when flagged for marketing
  planned?: boolean;      // set when turned into an action plan
}

export interface Task {
  id: string;
  title: string;
  done: boolean;
  priority: Priority;
  due?: string;
  projectId?: string;
  noteId?: string;        // where the task came from
}

export interface ContentItem {
  id: string;
  title: string;
  channel: string;
  stage: Stage;
  date?: string;
  noteId?: string;
}

export interface Project {
  id: string;
  name: string;
  summary: string;
  status: "active" | "paused" | "done";
  system: string;
}

export interface ResearchItem {
  id: string;
  title: string;
  source: string;
  status: "to-read" | "reading" | "done";
  noteId?: string;
}

export interface Txn {
  id: string;
  date: string;
  label: string;
  amount: number;         // + income, − expense, GBP
  category: string;
}

export interface Decision {
  id: string;
  date: string;
  title: string;
  outcome: string;
}

export interface Activity {
  id: string;
  at: string;
  from: string;
  to: string;
  text: string;
}

export interface OSState {
  notes: Note[];
  tasks: Task[];
  content: ContentItem[];
  projects: Project[];
  research: ResearchItem[];
  txns: Txn[];
  decisions: Decision[];
  activity: Activity[];
}
