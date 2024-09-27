// pages/users/[id].tsx
import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";

const fetchUserDetail = async (id: string) => {
  const response = await axios.get(`https://dummyjson.com/users/${id}`);
  return response.data;
};

const UserDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, error } = useQuery(
    id ? ["userDetail", id] : null,
    () => fetchUserDetail(id as string),
    { enabled: !!id }
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching user details: {error.message}</p>;

  return (
    <div>
      <h2>User Detail</h2>
      <p>ID: {data.id}</p>
      <p>First Name: {data.firstName}</p>
      <p>Last Name: {data.lastName}</p>
      <p>Age: {data.age}</p>
      <p>Gender: {data.gender}</p>
    </div>
  );
};

export default UserDetail;
