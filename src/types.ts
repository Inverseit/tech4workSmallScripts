export type ScheduleObject = {
    hours: number;
    weekday: number;
    notes: string;
  };
  
  export type JobSchedule = {
    job_id: string;
    schedule: ScheduleObject[];
  };
  
  export type JobEntry = {
    hours: number;
    notes: string;
    worked: string;
  };
  
  export type Tech4WorkEntry = {
      worked: string,
      hours1: string,
      notes: string,
      project_id: string,
      created_by: string,
      created: string,
      MM_insert: "form1",
  }