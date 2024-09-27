// pages/users/[id].tsx
import React from "react";
import Image from "next/image"; // Importing Image from next/image
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
    ["userDetail", id],
    () => fetchUserDetail(id as string),
    { enabled: !!id }
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching user details: {(error as Error).message}</p>;
  if (!data) return <p>No user data available</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-6">
          <Image
            src={data.image}
            alt={`${data.firstName} ${data.lastName}`}
            width={128}
            height={128}
            className="rounded-full border border-gray-300 object-cover mr-4"
          />
          <div>
            <h2 className="text-2xl font-bold">{`${data.firstName} ${data.lastName}`}</h2>
            <p className="text-gray-600">{data.role}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
            <p>
              <strong>Age:</strong> {data.age}
            </p>
            <p>
              <strong>Gender:</strong> {data.gender}
            </p>
            <p>
              <strong>Blood Group:</strong> {data.bloodGroup}
            </p>
            <p>
              <strong>Height:</strong> {data.height} cm
            </p>
            <p>
              <strong>Weight:</strong> {data.weight} kg
            </p>
            <p>
              <strong>Eye Color:</strong> {data.eyeColor}
            </p>
            <p>
              <strong>Hair:</strong> {data.hair.color} ({data.hair.type})
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Contact Details</h3>
            <p>
              <strong>Email:</strong> {data.email}
            </p>
            <p>
              <strong>Phone:</strong> {data.phone}
            </p>
            <p>
              <strong>Address:</strong> {data.address.address}, {data.address.city},{" "}
              {data.address.state}, {data.address.postalCode}, {data.address.country}
            </p>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-2">Company Information</h3>
            <p>
              <strong>Company Name:</strong> {data.company.name}
            </p>
            <p>
              <strong>Department:</strong> {data.company.department}
            </p>
            <p>
              <strong>Title:</strong> {data.company.title}
            </p>
            <p>
              <strong>Company Address:</strong> {data.company.address.address},{" "}
              {data.company.address.city}, {data.company.address.state},{" "}
              {data.company.address.postalCode}, {data.company.address.country}
            </p>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-2">Additional Information</h3>
            <p>
              <strong>University:</strong> {data.university}
            </p>
            <p>
              <strong>IP Address:</strong> {data.ip}
            </p>
            <p>
              <strong>MAC Address:</strong> {data.macAddress}
            </p>
            <p>
              <strong>SSN:</strong> {data.ssn}
            </p>
            <p>
              <strong>Wallet:</strong> {data.crypto.wallet}
            </p>
            <p>
              <strong>Network:</strong> {data.crypto.network}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserDetail;
