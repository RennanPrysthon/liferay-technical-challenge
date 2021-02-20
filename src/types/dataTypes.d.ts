declare interface Repository {
  url: string;
  name: string;
  description: string;
}

declare interface IssueData {
  date: string;
  opened: true;
  state: "open" | "closed"
  created_at: string;
  closed_at: string;
}

declare interface IssueResult {
  date: string,
  closed: number,
  opened: number
}