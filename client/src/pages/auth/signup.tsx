import { Toaster } from "react-hot-toast";
import { SignupForm } from "@/modules/auth";
import { AuthPageLayout, AppLayout } from "@/layouts";

export default function Signup() {
  return (
    <AppLayout title="Signup - Chatter">
      <AuthPageLayout>
        <div className="relative hidden min-h-screen lg:block">
          <img
            className="h-full w-full object-cover object-center brightness-50"
            src="/assets/images/signup.png"
            alt="chatter"
          />

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2">
            <img src="/assets/images/logo-large.svg" alt="chatter logo" />
          </div>
        </div>
        <div className="relative">
          <div className="absolute left-0 z-10">
            <img src="/assets/images/auth-pattern.png" alt="pattern" />
          </div>
          <SignupForm />
          <div className="absolute bottom-0 right-0 z-10">
            <img src="/assets/images/auth-pattern-2.png" alt="pattern" />
          </div>
        </div>
      </AuthPageLayout>
      <Toaster
        toastOptions={{
          style: {
            paddingInline: "10px",
            paddingBlock: "12px",
          },
        }}
      />
    </AppLayout>
  );
}
