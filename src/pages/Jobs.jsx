import React, { useEffect, useState } from "react";
import api from "../services/api";
import JobCard from "../components/JobCard";

// simple debounce helper
function debounce(fn, ms = 300){
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

export default function Jobs(){
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [location, setLocation] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 12;

  useEffect(() => {
    fetchCategories();
    fetchJobs(true);
    // eslint-disable-next-line
  }, []);

  // re-fetch when filters change (reset page)
  useEffect(() => {
    const debounced = debounce(() => { setPage(1); fetchJobs(true); }, 400);
    debounced();
    // eslint-disable-next-line
  }, [q, cat, location]);

  async function fetchCategories(){
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch(e){ console.error(e); }
  }

  async function fetchJobs(reset = false){
    try {
      setLoading(true);
      const currentPage = reset ? 1 : page;
      // we assume backend supports query params: q, categoryId, location, page, pageSize
      const params = {
        q: q || undefined,
        categoryId: cat || undefined,
        location: location || undefined,
        page: currentPage,
        pageSize
      };
      const res = await api.get("/recruitments", { params });
      const data = res.data || [];
      if (reset) {
        setJobs(data);
        setPage(1);
      } else {
        setJobs(prev => [...prev, ...data]);
      }
      setHasMore((data.length ?? 0) >= pageSize);
      setLoading(false);
    } catch(err){
      console.error(err);
      setLoading(false);
    }
  }

  const loadMore = () => {
    setPage(prev => prev + 1);
    // fetch next page
    setTimeout(async () => { // ensure page updated
      try {
        const res = await api.get("/recruitments", { params: { page: page+1, pageSize, q: q || undefined, categoryId: cat || undefined, location: location || undefined } });
        setJobs(prev => [...prev, ...(res.data || [])]);
        setHasMore((res.data?.length ?? 0) >= pageSize);
      } catch(e){ console.error(e); }
    }, 50);
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Job Listings</h2>

      {/* Filters */}
      <div className="row g-2 mb-4">
        <div className="col-md-4">
          <input className="form-control" placeholder="Search jobs, e.g. 'Frontend'" value={q} onChange={e => setQ(e.target.value)} />
        </div>
        <div className="col-md-3">
          <select className="form-select" value={cat} onChange={e => setCat(e.target.value)}>
            <option value="">All categories</option>
            {categories.map(c => <option key={c.id ?? c.categoryId} value={c.id ?? c.categoryId}>{c.name}</option>)}
          </select>
        </div>
        <div className="col-md-3">
          <input className="form-control" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
        </div>
        <div className="col-md-2">
          <button className="btn btn-secondary w-100" onClick={() => { setQ(""); setCat(""); setLocation(""); fetchJobs(true); }}>Reset</button>
        </div>
      </div>

      {/* Jobs grid */}
      <div className="row row-cols-1 row-cols-md-3 g-3">
        {jobs.length === 0 && !loading && <div className="col"><p>No jobs found.</p></div>}
        {jobs.map(job => (
          <div className="col" key={job.id || job.recruitmentId}>
            <JobCard job={job} />
          </div>
        ))}
      </div>

      {/* Load more */}
      <div className="text-center my-4">
        {loading && <div className="spinner-border"></div>}
        {!loading && hasMore && jobs.length > 0 && (
          <button className="btn btn-outline-primary" onClick={loadMore}>Load more</button>
        )}
      </div>
    </div>
  );
}
