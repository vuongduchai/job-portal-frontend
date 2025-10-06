import React from "react";
import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{job.title}</h5>
        <p className="mb-1 text-muted">{job.company?.name ?? job.companyName ?? "Unknown"}</p>
        <p className="text-secondary small mb-3">{job.location ?? job.address}</p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <small className="text-muted">{new Date(job.createdAt || job.created_at || Date.now()).toLocaleDateString()}</small>
          <Link to={`/jobs/${job.id || job.recruitmentId}`} className="btn btn-primary btn-sm">View</Link>
        </div>
      </div>
    </div>
  );
}
