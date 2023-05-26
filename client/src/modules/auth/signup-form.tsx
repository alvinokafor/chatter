import { Link } from "react-router-dom";
import {
  FormInput,
  GoogleAuthButton,
  SignupButton,
  Divider,
} from "@components/auth/ui";

export type FormField = {
  field_title: string;
  field_id: string;
  field_type: string;
};

const form_fields = [
  { field_title: "First Name", field_id: "first_name", field_type: "text" },
  { field_title: "Last Name", field_id: "last_name", field_type: "text" },
  { field_title: "Email", field_id: "email", field_type: "email" },
  { field_title: "Password", field_id: "password", field_type: "password" },
] as FormField[];

export default function SignupForm() {
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
