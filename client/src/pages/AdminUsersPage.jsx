import { useEffect, useState } from "react";
import { getAllUsers, updateUserRole } from "../services/userService";

function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  async function handleRoleChange(userId, newRole) {
    try {
      const updatedUser = await updateUserRole(userId, newRole);

      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === userId ? updatedUser : user)),
      );
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-slate-900">
          Admin Role Management
        </h1>

        <p className="mt-2 text-slate-600">Manage user roles for ClubLens.</p>

        {loading && <p className="mt-6">Loading users...</p>}

        {error && (
          <p className="mt-6 rounded-lg bg-red-100 px-4 py-3 text-red-700">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Email</th>
                  <th className="px-5 py-4">Role</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-t">
                    <td className="px-5 py-4">{user.name}</td>
                    <td className="px-5 py-4">{user.email}</td>
                    <td className="px-5 py-4">
                      <select
                        value={user.role}
                        onChange={(event) =>
                          handleRoleChange(user._id, event.target.value)
                        }
                        className="rounded-lg border px-3 py-2"
                      >
                        <option value="admin">Admin</option>
                        <option value="photographer">Photographer</option>
                        <option value="member">Member</option>
                        <option value="viewer">Viewer</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminUsersPage;
