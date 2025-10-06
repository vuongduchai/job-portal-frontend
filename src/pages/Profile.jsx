import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Xin chào, {user?.name || "Người dùng"}</h2>
      <p>Email: {user?.email}</p>
    </div>
  );
};

export default Profile;
