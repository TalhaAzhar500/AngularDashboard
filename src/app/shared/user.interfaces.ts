export interface userFormat {
  access_token: string;
  id: string;
  name: string;
  role: string;
}

export interface AdminFormat {
  _id: number;
  admin_name: string;
  email: string;
  role: string;
}

export interface MemberFormat {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  tech_stack: string;
  team_lead: string;
  expense: number;
  projects: string;
}

export interface ProjectFormat {
  _id: string;
  name: string;
  stack: string;
  team_lead: string;
  duration: string;
  coordinator: string;
  platform: string;
  client: string;
  consultant: string;
  start_date: Date;
  end_date: Date;
  cost: string;
  __v: number;
  status: string;
  createdAt: Date;
}
