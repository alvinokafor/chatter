import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { GoogleAuthButton, Divider, LoginButton } from "@components/auth/ui";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const form_schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const { register, handleSubmit } = useForm<LoginFormData>({
    resolver: yupResolver(form_schema),
  });

  const handleFormSubmit = (data: LoginFormData) => {
    console.log(data);
  };
  return (
    <div className="relative z-20 mx-auto mt-10 max-w-xs text-black sm:max-w-xl">
      <div className="mb-7 space-y-6 text-center">
        <div className="mt-5 lg:hidden">
          <img className="mx-auto" src="/assets/images/logo-small.svg" alt="" />
        </div>
        <h2 className="text-3xl font-bold sm:text-4xl">Login</h2>
      </div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="mb-7 space-y-6">
          <div className="flex flex-col space-y-4">
            <label className="font-medium" htmlFor={"email"}>
              Email
            </label>
            <input
              className="rounded-md border border-grey/60 p-3 outline-grey/75"
              placeholder="Email"
              type="email"
              id="email"
              required
              {...register("email")}
            />
          </div>

          <div className="flex flex-col space-y-4">
            <label className="font-medium" htmlFor={"password"}>
              Password
            </label>
            <input
              className="rounded-md border border-grey/60 p-3 outline-grey/75"
              placeholder="Password"
              type="password"
              id="password"
              required
              {...register("password")}
            />
          </div>
        </div>
        <LoginButton />
        <Divider />
        <GoogleAuthButton />
      </form>

      <p className="my-6 text-center">
        Dont have an account?{" "}
        <Link to="/signup">
          <button>
            <strong>Signup</strong>
          </button>
        </Link>
      </p>
    </div>
  );
}
