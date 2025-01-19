import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from "react";
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Please provide correct password" })
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Page = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    
    formState: { errors ,isSubmitting},
    reset,
    handleSubmit,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = (data: LoginFormValues) => {
    try {
      auth.login(data);
       
    } catch (error) {
      console.error(error);
    }
    reset();
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex lg:items-center lg:justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                style={{ paddingLeft: "1rem" }}
                id="email"
                {...register("email")}
                type="email"
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  errors.email ? "ring-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm"></div>
            </div>
            <div className="relative mt-2">
              <input
                style={{ paddingLeft: "1rem" }}
                id="password"
                {...register("password")}
                type={showPassword ? "text": "password"}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  errors.password ? "ring-red-500" : ""
                }`}
              />
              {errors.password ? (
                <button type="button" className="absolute  inset-y-0 right-0 pr-3 flex items-center mb-4" onClick={ () => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash size={20}/> : <FaEye size={20}/>}</button>
                ):(
                  <button type="button" className="absolute  inset-y-0 right-0 pr-3 flex items-center" onClick={ () => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash size={20}/> : <FaEye size={20}/>}</button>
                )}
             
              {errors.password && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isSubmitting ? "loading..":  "Sign in"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <a  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            <button onClick={() => navigate("/register")}>Register here</button>
          </a>
        </p>
      </div>
    </div>
  );
};

export default Page;
