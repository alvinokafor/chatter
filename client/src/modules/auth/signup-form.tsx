import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { GoogleAuthButton, SignupButton, Divider } from "@components/auth/ui";

type RegisterFormData = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export default function SignupForm() {
  const form_schema = yup.object().shape({
    firstname: yup.string().required("Your first name is required"),
    lastname: yup.string().required("Your lastname is required"),
    email: yup
      .string()
      .email("Email is not valid")
      .required("Your email is required"),
    password: yup
      .string()
      .min(6, "Password must be a minimum of 6 characters")
      .max(8, "Password must have a maximum of 8 characters")
      .required("Your password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(form_schema),
  });

  const handleFormSubmit = (data: RegisterFormData) => {
    console.log(data);
  };

  return (
    <div className="relative z-20 mx-auto mt-10 max-w-xs text-black sm:max-w-xl">
      <div className="mb-7 space-y-6 text-center">
        <div className="mt-5 lg:hidden">
          <img className="mx-auto" src="/assets/images/logo-small.svg" alt="" />
        </div>
        <h2 className="text-3xl font-bold sm:text-4xl">Sign up</h2>
        <p className="text-grey">
          Create your account for free and start sharing your stories
        </p>
      </div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="mb-7 space-y-6">
          <div className="flex flex-col space-y-4">
            <label className="font-medium" htmlFor={"firstname"}>
              First Name
            </label>
            <input
              className={` ${
                errors?.firstname
                  ? "border-red-400 outline-red-400"
                  : "border-grey/60 outline-grey/75"
              } rounded-md border p-3 `}
              placeholder="First Name"
              type="text"
              id="firstname"
              {...register("firstname")}
            />
            {errors?.firstname && (
              <p className="text-red-400">{errors.firstname?.message}</p>
            )}
          </div>

          <div className="flex flex-col space-y-4">
            <label className="font-medium" htmlFor={"lastname"}>
              Last Name
            </label>
            <input
              className={` ${
                errors?.lastname
                  ? "border-red-400 outline-red-400"
                  : "border-grey/60 outline-grey/75"
              } rounded-md border p-3 `}
              placeholder="Last Name"
              type="text"
              id="lastname"
              {...register("lastname")}
            />
            {errors?.lastname && (
              <p className="text-red-400">{errors.lastname?.message}</p>
            )}
          </div>

          <div className="flex flex-col space-y-4">
            <label className="font-medium" htmlFor={"email"}>
              Email
            </label>
            <input
              className={` ${
                errors?.email
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

        <SignupButton />
        <Divider />
        <GoogleAuthButton />
      </form>

      <p className="my-6 text-center">
        Already have an account?{" "}
        <Link to="/login">
          <button>
            <strong>Login</strong>
          </button>
        </Link>
      </p>
    </div>
  );
}
