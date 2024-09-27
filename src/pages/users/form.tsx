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

  const onSubmit = async (data: {
    firstName: string;
    lastName: string;
    email: string;
  }) => {
    if (isEdit) {
      await axios.put(`https://dummyjson.com/users/${user.id}`, data);
    } else {
      await axios.post("https://dummyjson.com/users/add", data);
    }
    router.push("/users");
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{isEdit ? "Edit User" : "Add User"}</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md text-black"
      >
        <div className="mb-4">
          <label>First Name</label>
          <input
            {...register("firstName", { required: true })}
            className="border p-2 w-full"
          />
          {errors.firstName && (
            <span className="text-red-500">First name is required</span>
          )}
        </div>
        <div className="mb-4">
          <label>Last Name</label>
          <input
            {...register("lastName", { required: true })}
            className="border p-2 w-full"
          />
          {errors.lastName && <span className="text-red-500">Last name is required</span>}
        </div>
        <div className="mb-4">
          <label>Email</label>
          <input
            {...register("email", { required: true })}
            className="border p-2 w-full"
          />
          {errors.email && <span className="text-red-500">Email is required</span>}
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          {isEdit ? "Update User" : "Add User"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
