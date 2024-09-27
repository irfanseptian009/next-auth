import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

const fetchUsers = async (sortBy: string, order: string) => {
  const response = await axios.get(
    `https://dummyjson.com/users?sortBy=${sortBy}&order=${order}`
  );
  return response.data.users;
};

const UserList = () => {
  const [sortBy, setSortBy] = useState("firstName");
  const [order, setOrder] = useState("asc");
  const router = useRouter();
  const { data, isLoading, error } = useQuery(["users", sortBy, order], () =>
    fetchUsers(sortBy, order)
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <div className="mb-4">
        <label>Sort By:</label>
        <select onChange={(e) => setSortBy(e.target.value)} className="border ml-2 p-2">
          <option value="firstName">First Name</option>
          <option value="lastName">Last Name</option>
        </select>
        <label className="ml-4">Order:</label>
        <select onChange={(e) => setOrder(e.target.value)} className="border ml-2 p-2">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(
            (user: {
              id: number;
              firstName: string;
              lastName: string;
              email: string;
            }) => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="text-blue-500"
                    onClick={() => router.push(`/users/${user.id}`)}
                  >
                    View
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
