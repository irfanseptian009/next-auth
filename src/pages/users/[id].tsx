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

  interface UserData {
    firstName: string;
    lastName: string;
    image: string;
    role: string;
    age: number;
    gender: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: {
      color: string;
      type: string;
    };
    email: string;
    phone: string;
    address: {
      address: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
    company: {
      name: string;
      department: string;
      title: string;
      address: {
        address: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
      };
    };
    university: string;
    ip: string;
    macAddress: string;
    ssn: string;
    crypto: {
      wallet: string;
      network: string;
    };
  }

  const { data, isLoading, error } = useQuery<UserData, Error>(
    ["userDetail", id],
    () => fetchUserDetail(id as string),
    { enabled: !!id }
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching user details: {error.message}</p>;
  if (!data) return null;

  return (
    <div className=" bg-gray-200 mx-auto py-10 px-4 sm:px-6 lg:px-32">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-6">
          <img
            src={data.image}
            alt={`${data.firstName} ${data.lastName}`}
            className="w-32 h-32 rounded-full border border-gray-300 object-cover mr-4"
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
