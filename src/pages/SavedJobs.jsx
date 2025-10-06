import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";
import { isAuthenticated } from "../utils/auth";

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = "/login";
      return;
    }

    const fetchSavedJobs = async () => {
      try {
        const res = await api.get("/SaveJobs");
        setSavedJobs(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách công việc đã lưu:", error);
      }
    };

    fetchSavedJobs();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Công việc đã lưu</h2>
        {savedJobs.length === 0 ? (
          <p>Bạn chưa lưu công việc nào.</p>
        ) : (
          <ul className="space-y-4">
            {savedJobs.map((job) => (
              <li
                key={job.recruitmentId}
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold">{job.recruitment?.title}</h3>
                <p className="text-gray-600">
                  {job.recruitment?.company?.nameCompany ?? job.recruitment?.company?.name}
                </p>
                <p>Địa chỉ: {job.recruitment?.address}</p>
                <p>Lương: {job.recruitment?.salary}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
