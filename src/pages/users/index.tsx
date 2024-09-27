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

  if (isLoading) return <div className="text-center text-lg">Loading...</div>;
  if (error)
    return <div className="text-center text-lg text-red-500">Error loading users</div>;

  return (
    <div className=" bg-gray-100 mx-auto px-14 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">User List</h1>
      <div className="mb-6 flex justify-center space-x-4">
        <div className="flex items-center">
          <label className="mr-2">Sort By:</label>
          <select
            onChange={(e) => setSortBy(e.target.value)}
            className="border text-black p-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
          </select>
        </div>
        <div className="flex items-center">
          <label className="mr-2">Order:</label>
          <select
            onChange={(e) => setOrder(e.target.value)}
            className="border text-black p-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="table-auto w-full bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left">First Name</th>
              <th className="py-2 px-4 text-left">Last Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Actions</th>
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
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4">{user.firstName}</td>
                  <td className="py-2 px-4">{user.lastName}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">
                    <button
                      className="text-blue-500 hover:underline"
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
    </div>
  );
};

export default UserList;
