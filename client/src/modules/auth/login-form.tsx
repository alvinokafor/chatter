import { Link } from "react-router-dom";
import { FormField } from "./signup-form";
import {
  GoogleAuthButton,
  FormInput,
  Divider,
  LoginButton,
} from "@components/auth/ui";

const form_fields = [
  { field_title: "Email", field_id: "email", field_type: "email" },
  { field_title: "Password", field_id: "password", field_type: "password" },
] as FormField[];

export default function LoginForm() {
  return (
    <div className="relative z-20 mx-auto mt-10 max-w-xs text-black sm:max-w-xl">
      <div className="mb-7 space-y-6 text-center">
        <div className="mt-5 lg:hidden">
          <img className="mx-auto" src="/assets/images/logo-small.svg" alt="" />
        </div>
        <h2 className="text-3xl font-bold sm:text-4xl">Login</h2>
      </div>
      <form>
        <div className="mb-7 space-y-6">
          {form_fields.map((form) => (
            <FormInput
              key={form.field_id}
              field_id={form.field_id}
              field_type={form.field_type}
              field_title={form.field_title}
            />
          ))}
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
