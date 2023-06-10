import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Public_Sans } from "next/font/google";

const public_sans = Public_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={public_sans.className}>
      <Component {...pageProps} />
    </main>
  );
}
