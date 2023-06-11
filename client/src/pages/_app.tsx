import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Public_Sans } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const public_sans = Public_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <main className={public_sans.className}>
        <Component {...pageProps} />
      </main>
    </QueryClientProvider>
  );
}
