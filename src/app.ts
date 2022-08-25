import dayjs from "dayjs";
import qs from "qs";
import fetch from "node-fetch";
import { JobEntry, JobSchedule, ScheduleObject, Tech4WorkEntry } from "./types"
import { black_list, functional, immigration, matrices } from "./schedule";
const user_id = "7371";

const get_entries = (schedule: ScheduleObject[]) => {
  const today = dayjs().date();
  const allDays: dayjs.Dayjs[] = [...Array(today).keys()].map((v) =>
    dayjs().subtract(v, "day")
  );

  const entries: JobEntry[] = [];

  for (const day of allDays) {
    let weekday = day.day();
    for (const schedule_object of schedule) {
      if (
        weekday === schedule_object.weekday &&
        !black_list.includes(day.format("M/D/YYYY"))
      ) {
        entries.push({
          hours: schedule_object.hours,
          notes: schedule_object.notes,
          worked: day.format("M/D/YYYY"),
        });
      }
    }
  }

  return entries;
};

const fillJob = (job_schedule: JobSchedule) => {
  const entries = get_entries(job_schedule.schedule);
  console.log(entries);
  return entries;
};

let immigration_entries =  fillJob(immigration);
let functional_entries = fillJob(functional);
let matrices_entries = fillJob(matrices);

const to_request_object =
  (job_id: string, user_id: string) => (entry: JobEntry):Tech4WorkEntry => {
    return {
      worked: entry.worked,
      hours1: entry.hours + "",
      notes: entry.notes,
      project_id: job_id,
      created_by: user_id,
      created: dayjs().format("M/D/YYYY"),
      MM_insert: "form1",
    };
  };

const entries1 = immigration_entries.map(
  to_request_object(immigration.job_id, user_id)
);

const entries2 = functional_entries.map(
  to_request_object(functional.job_id, user_id)
);

const entries3 = matrices_entries.map(
  to_request_object(matrices.job_id, user_id)
);

const all_entries = [...entries1, ...entries2, ...entries3];

console.log(all_entries, all_entries.length);

const submit_entry = async (entry: Tech4WorkEntry) => {
    try {        
        const job_id = entry.project_id;
        const user_id = entry.created_by;
        const res = await fetch(`http://www.tech4work.com/studentemp/add_hours.asp?jid=${job_id}&uid=${user_id}`, {
          method: "POST",
          body: qs.stringify(entry),
          headers: {
            "accept-language": "en",
            "cache-control": "max-age=0",
            "content-type": "application/x-www-form-urlencoded",
            "upgrade-insecure-requests": "1"
          },
          redirect: "manual",
        });
        console.log(res.status, res);
      } catch (error) {
        console.log(error);
      }
}

const submit = async (all_entries: Tech4WorkEntry[]) => {
    await Promise.all(all_entries.map(async entry => await submit_entry(entry)));
}

const manual = false;

if (!manual){
    submit(all_entries);
}