import { createContext, useState, useEffect } from "react";

export const JobContext = createContext();

export function JobProvider({ children }) {

  const [jobs, setJobs] = useState(() => {
  const savedJobs = localStorage.getItem("jobs");

  return savedJobs ? JSON.parse(savedJobs) : [];
});
const [editingJob, setEditingJob] = useState(null);
useEffect(() => {
  localStorage.setItem("jobs", JSON.stringify(jobs));
}, [jobs]);
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