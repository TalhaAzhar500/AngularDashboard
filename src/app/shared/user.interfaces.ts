export interface userFormat {
  accesstoken: string;
  id: string;
  name: string;
  role: string;
}

export interface DepartmentFormat {
  _id: number;
  name: string;
  department_head: string;
  createdBy: string;
}

export interface MemberFormat {
  name: string;
  email: string;
  password: string;
  tech_stack: string;
  role: string;
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
