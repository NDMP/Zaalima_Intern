import { createContext, useState } from "react";

export const JobContext = createContext();

export function JobProvider({ children }) {

  const [jobs, setJobs] = useState([]);
const [editingJob, setEditingJob] = useState(null);
  const deleteJob = (id) => {
  setJobs((prevJobs) =>
    prevJobs.filter((job) => job.id !== id)
  );
};

  return (
    <JobContext.Provider
     value={{
  jobs,
  setJobs,
  deleteJob,
  editingJob,
  setEditingJob,
}}
    >
      {children}
    </JobContext.Provider>
  );
}