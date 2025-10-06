import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const Companies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await api.get("/api/companies");
        setCompanies(res.data);
      } catch (err) {
        console.error("Lỗi khi tải danh sách công ty:", err);
      }
    };

    fetchCompanies();
  }, []);

  if (!isAuthenticated()) {
    return <p className="text-center mt-10 text-red-500">Bạn cần đăng nhập để xem danh sách công ty.</p>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Danh sách công ty</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {companies.map((company) => (
          <Link key={company.id} to={`/companies/${company.id}`} className="border p-4 rounded shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">{company.name}</h2>
            <p className="text-gray-500">{company.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Companies;
