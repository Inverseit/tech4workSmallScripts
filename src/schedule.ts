import { JobSchedule} from "./types"

export const immigration: JobSchedule = {
    job_id: "3028",
    schedule: [
      { hours: 2, weekday: 0, notes: "Appointment based OH" },
      { hours: 2, weekday: 2, notes: "Meeting + Grading" },
      { hours: 2, weekday: 3, notes: "Grading" },
    ],
  };
  
  export const functional: JobSchedule = {
    job_id: "3033",
    schedule: [
      { hours: 2, weekday: 0, notes: "OH" },
      { hours: 2.5, weekday: 1, notes: "Grading" },
      { hours: 1, weekday: 2, notes: "Online responsibiliy" },
      { hours: 1.5, weekday: 4, notes: "Faculty meeting + Lab" },
    ],
  };
  
  export const matrices: JobSchedule = {
    job_id: "3042",
    schedule: [{ hours: 2.5, weekday: 3, notes: "grading" }],
  };
  
  export const black_list = ["8/21/2022", "8/22/2022"];