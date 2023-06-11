import { Spinner } from "@/partials/icons";
import { UseFormReset } from "react-hook-form";
import { RegisterFormData } from "@/modules/auth/signup-form";

export default function SignupButton({ isPending }: { isPending: boolean }) {
  return (
    <button
      disabled={isPending}
      type="submit"
      className={`${
        isPending ? "bg-primary/80" : "bg-primary"
      } w-full text-center rounded-md py-3 text-white`}
    >
      {isPending ? <Spinner /> : "Sign up"}
    </button>
  );
}
