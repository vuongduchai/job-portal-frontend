import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";

export default function JobDetail(){
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { fetchJob(); }, [id]);

  async function fetchJob(){
    try {
      const res = await api.get(`/recruitments/${id}`);
      setJob(res.data);
    } catch(e){ console.error(e); }
  }

  async function onApply(){
    if(!token) {
      // redirect to login and keep intended path
      navigate("/login", { state: { from: `/jobs/${id}` } });
      return;
    }
    try {
      // call apply endpoint
      await api.post("/applyposts", { recruitmentId: id });
      alert("Applied successfully!");
    } catch(err){
      console.error(err);
      alert("Apply failed: " + (err.response?.data || err.message));
    }
  }

  if(!job) return <div className="container mt-5"><p>Loading...</p></div>;

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-8">
          <h2>{job.title}</h2>
          <p className="text-muted">{job.company?.name}</p>
          <h5>Description</h5>
          <p>{job.description}</p>
          <h5>Requirements</h5>
          <p>{job.experience}</p>
        </div>
        <div className="col-md-4">
          <div className="card p-3">
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
            <button className="btn btn-success w-100" onClick={onApply}>Apply now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
