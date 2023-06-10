import { AuthPageLayout, AppLayout } from "@/layouts";
import { LoginForm } from "@/modules/auth";

export default function Login() {
  return (
    <AppLayout title="Login - Chatter">
      <AuthPageLayout>
        <div className="relative">
          <div className="absolute left-0 z-10">
            <img src="/assets/images/auth-pattern.png" alt="pattern" />
          </div>
          <LoginForm />
          <div className="absolute bottom-0 right-0 z-10">
            <img src="/assets/images/auth-pattern-2.png" alt="pattern" />
          </div>
        </div>
        <div className="relative hidden min-h-screen lg:block">
          <img
            className="h-full w-full object-cover object-center brightness-50"
            src="/assets/images/login.png"
            alt="chatter"
          />

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2">
            <img src="/assets/images/logo-large.svg" alt="chatter logo" />
          </div>
        </div>
      </AuthPageLayout>
    </AppLayout>
  );
}
