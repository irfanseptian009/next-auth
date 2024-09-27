import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface UserFormProps {
  isEdit?: boolean;
  user?: {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    age?: number;
    gender?: string;
    phone?: string;
    username?: string;
    password?: string;
    birthDate?: string;
    address?: {
      address?: string;
      city?: string;
      state?: string;
      postalCode?: string;
      country?: string;
    };
  };
}

const UserForm = ({ isEdit = false, user = {} }: UserFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: user,
  });
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      if (isEdit) {
        await axios.put(`https://dummyjson.com/users/${user.id}`, data);
      } else {
        await axios.post("https://dummyjson.com/users/add", data);
      }
      router.push("/users");
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };
  return (
    <div className="mx-auto py-10 px-4 sm:px-8 lg:px-24 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">
        {isEdit ? "Edit User" : "Add User"}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium mb-2">First Name</label>
            <input
              {...register("firstName", { required: "First name is required" })}
              className={`border p-3 w-full rounded-lg transition duration-200 focus:outline-none ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter first name"
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm">{errors.firstName.message}</span>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Last Name</label>
            <input
              {...register("lastName", { required: "Last name is required" })}
              className={`border p-3 w-full rounded-lg transition duration-200 focus:outline-none ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter last name"
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm">{errors.lastName.message}</span>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email address",
                },
              })}
              className={`border p-3 w-full rounded-lg transition duration-200 focus:outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter email"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium mb-2">Age</label>
            <input
              type="number"
              {...register("age", { required: "Age is required", min: 0 })}
              className={`border p-3 w-full rounded-lg transition duration-200 focus:outline-none ${
                errors.age ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter age"
            />
            {errors.age && (
              <span className="text-red-500 text-sm">{errors.age.message}</span>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium mb-2">Gender</label>
            <select
              {...register("gender", { required: "Gender is required" })}
              className={`border p-3 w-full rounded-lg transition duration-200 focus:outline-none ${
                errors.gender ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <span className="text-red-500 text-sm">{errors.gender.message}</span>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              {...register("phone", { required: "Phone number is required" })}
              className={`border p-3 w-full rounded-lg transition duration-200 focus:outline-none ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">{errors.phone.message}</span>
            )}
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              {...register("username", { required: "Username is required" })}
              className={`border p-3 w-full rounded-lg transition duration-200 focus:outline-none ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter username"
            />
            {errors.username && (
              <span className="text-red-500 text-sm">{errors.username.message}</span>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className={`border p-3 w-full rounded-lg transition duration-200 focus:outline-none ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter password"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>

          {/* Birth Date */}
          <div>
            <label className="block text-sm font-medium mb-2">Birth Date</label>
            <input
              type="date"
              {...register("birthDate", { required: "Birth date is required" })}
              className={`border p-3 w-full rounded-lg transition duration-200 focus:outline-none ${
                errors.birthDate ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.birthDate && (
              <span className="text-red-500 text-sm">{errors.birthDate.message}</span>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-2">Address</label>
            <input
              {...register("address.address", { required: "Address is required" })}
              className={`border p-3 w-full rounded-lg transition duration-200 focus:outline-none ${
                errors.address?.address ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter address"
            />
            {errors.address?.address && (
              <span className="text-red-500 text-sm">
                {errors.address.address.message}
              </span>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium mb-2">City</label>
            <input
              {...register("address.city", { required: "City is required" })}
              className={`border p-3 w-full rounded-lg transition duration-200 focus:outline-none ${
                errors.address?.city ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter city"
            />
            {errors.address?.city && (
              <span className="text-red-500 text-sm">{errors.address.city.message}</span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="w-32 bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-500 transition duration-200"
          >
            {isEdit ? "Update User" : "Add User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
