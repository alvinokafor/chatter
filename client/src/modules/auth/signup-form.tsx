import { useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { createUser } from "@/api/usersApi";
import { GoogleAuthButton, SignupButton, Divider } from "@/components/auth/ui";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function SignupForm() {
  const form_schema = yup.object().shape({
    firstName: yup.string().required("Your first name is required"),
    lastName: yup.string().required("Your lastname is required"),
    email: yup
      .string()
      .email("Email is not valid")
      .required("Your email is required"),
    password: yup
      .string()
      .min(6, "Password must be a minimum of 6 characters")
      .max(32, "Password must have a maximum of 32 characters")
      .required("Your password is required"),
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(form_schema),
  });

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess(data) {
      console.log(data.data);
      toast.success("Registration successful", {
        duration: 4000,
        position: "top-center",
      });
    },
    onError(error) {
      console.log(error);
      toast.error("An error occurred", {
        duration: 4000,
        position: "top-center",
      });
    },
  });

  const handleRegister = (data: RegisterFormData) => {
    createUserMutation.mutate(data);
  };

  useEffect(() => {
    reset();
  }, [createUserMutation.isSuccess]);

  return (
    <div className="relative z-20 mx-auto mt-10 max-w-xs text-black sm:max-w-lg xl:max-w-xl">
      <div className="mb-7 space-y-6 text-center">
        <div className="mt-5 lg:hidden">
          <img className="mx-auto" src="/assets/images/logo-small.svg" alt="" />
        </div>
        <h2 className="text-3xl font-bold sm:text-4xl">Sign up</h2>
        <p className="text-grey">
          Create your account for free and start sharing your stories
        </p>
      </div>
      <form onSubmit={handleSubmit(handleRegister)}>
        <div className="mb-7 space-y-6">
          <div className="flex flex-col space-y-4">
            <label className="font-medium" htmlFor={"firstname"}>
              First Name
            </label>
            <input
              className={` ${
                errors?.firstName
                  ? "border-red-400 outline-red-400"
                  : "border-grey/60 outline-grey/75"
              } rounded-md border p-3 `}
              placeholder="First Name"
              type="text"
              id="firstname"
              {...register("firstName")}
            />
            {errors?.firstName && (
              <p className="text-red-400">{errors.firstName?.message}</p>
            )}
          </div>

          <div className="flex flex-col space-y-4">
            <label className="font-medium" htmlFor={"lastname"}>
              Last Name
            </label>
            <input
              className={` ${
                errors?.lastName
                  ? "border-red-400 outline-red-400"
                  : "border-grey/60 outline-grey/75"
              } rounded-md border p-3 `}
              placeholder="Last Name"
              type="text"
              id="lastname"
              {...register("lastName")}
            />
            {errors?.lastName && (
              <p className="text-red-400">{errors.lastName?.message}</p>
            )}
          </div>

          <div className="flex flex-col space-y-4">
            <label className="font-medium" htmlFor={"email"}>
              Email
            </label>
            <input
              className={` ${
                errors?.email || createUserMutation.isError
                  ? "border-red-400 outline-red-400"
                  : "border-grey/60 outline-grey/75"
              } rounded-md border p-3 `}
              placeholder="Email"
              type="email"
              id="email"
              {...register("email")}
            />
            {errors?.email && (
              <p className="text-red-400">{errors.email?.message}</p>
            )}
            {createUserMutation.isError && (
              <p className="text-red-400">Email already exists</p>
            )}
          </div>

          <div className="flex flex-col space-y-4">
            <label className="font-medium" htmlFor={"password"}>
              Password
            </label>
            <input
              className={` ${
                errors?.password
                  ? "border-red-400 outline-red-400"
                  : "border-grey/60 outline-grey/75"
              } rounded-md border p-3 `}
              placeholder="Password"
              type="password"
              id="password"
              {...register("password")}
            />
            {errors?.password && (
              <p className="text-red-400">{errors.password?.message}</p>
            )}
          </div>
        </div>

        <SignupButton isPending={createUserMutation.isLoading} />
        <Divider />
        <GoogleAuthButton />
      </form>

      <p className="my-6 text-center">
        Already have an account?{" "}
        <Link href="/auth/login">
          <button>
            <strong>Login</strong>
          </button>
        </Link>
      </p>
    </div>
  );
}
