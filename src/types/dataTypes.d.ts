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
  date: string;
  closed: number;
  opened: number;
}

declare interface PullData {
  date: string;
  created_at: string;
  merged_at: string;
  state: 'closed' | 'open';
  closed: number;
  opened: number;
  url: string;
}

declare interface PullDetails {
  date: string;
  state: 'closed' | 'open';
  additions: number;
  deletions: number;
  totalChanges: number;
  created_at: string;
  merged_at: string;
  state: 'closed' | 'open';
  closed: number;
  opened: number;
  url: string;
}

declare interface PullResult {
  date: string;
  closed: number;
  opened: number;
  merged: number;
}


declare interface PullDetailsResponse {
  higher: {
    count: integer;
    average: number;
  },
  medium: {
    count: integer;
    average: number;
  },
  small: {
    count: integer;
    average: number
  }
}