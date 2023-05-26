import React from "react";

type AuthPageLayoutProps = {
  children: React.ReactNode;
};

export default function AuthPageLayout({ children }: AuthPageLayoutProps) {
  return (
    <section className="grif-cols-1 grid h-screen lg:grid-cols-2">
      {children}
    </section>
  );
}
