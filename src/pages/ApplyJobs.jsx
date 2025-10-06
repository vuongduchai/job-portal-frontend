import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import api from "../api/api";
import { isAuthenticated } from "../utils/auth";

export default function ApplyJobs() {
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = "/login";
      return;
    }

    const fetchAppliedJobs = async () => {
      try {
        const res = await api.get("/ApplyPosts");
        setAppliedJobs(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách việc đã nộp:", error);
      }
    };

    fetchAppliedJobs();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Công việc đã ứng tuyển</h2>
        {appliedJobs.length === 0 ? (
          <p>Bạn chưa ứng tuyển công việc nào.</p>
        ) : (
          <ul className="space-y-3">
            {appliedJobs.map((job) => (
              <li key={job.recruitmentId} className="border rounded p-4 shadow">
                <h3 className="text-lg font-semibold">{job.recruitment?.title}</h3>
                <p>Công ty: {job.recruitment?.company?.name}</p>
                <p>Ngày nộp: {new Date(job.applyDate).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
