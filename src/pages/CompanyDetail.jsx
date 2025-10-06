import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/api";

export default function CompanyDetail() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [recruitments, setRecruitments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCompany = await api.get(`/Companies/${id}`);
        setCompany(resCompany.data);

        const resJobs = await api.get(`/Recruitments?companyId=${id}`);
        setRecruitments(resJobs.data.items || []);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu công ty:", error);
      }
    };
    fetchData();
  }, [id]);

  if (!company) return <p className="p-6">Đang tải...</p>;

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-2">{company.nameCompany ?? company.name}</h2>
        <p className="text-gray-600 mb-1">Địa chỉ: {company.address}</p>
        <p className="text-gray-600 mb-1">Điện thoại: {company.phone}</p>
        <p className="text-gray-600 mb-4">Email: {company.email}</p>

        <h3 className="text-2xl font-semibold mb-3">Tin tuyển dụng của công ty</h3>
        {recruitments.length === 0 ? (
          <p>Chưa có tin tuyển dụng nào.</p>
        ) : (
          <ul className="space-y-3">
            {recruitments.map((job) => (
              <li
                key={job.id}
                className="border p-4 rounded hover:shadow-md transition"
              >
                <h4 className="font-semibold text-lg">{job.title}</h4>
                <p>Lương: {job.salary}</p>
                <p>Địa chỉ: {job.address}</p>
                <p>Hạn nộp: {new Date(job.deadline).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
