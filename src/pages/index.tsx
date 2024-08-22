import Link from "next/link";
import Head from "next/head";
import Header from "components/Header";
import { signIn, useSession } from "next-auth/react";
import type { NextPage } from "next";

const EarlyAccessButton = () => {
  const { data: session, status } = useSession();

  if (status == "authenticated") {
    if (session!.early_access) {
      return (
        <div className="relative rounded ">
          <Link passHref href="/subs">
            <button className="glowbttn py-3 font-bold text-white transition-shadow duration-300 bg-black rounded shadow-2xl focus-within:ring-4 px-7 hover:bg-text-rad hover:shadow-none">
              Start Unsubscribing
            </button>
          </Link>
        </div>
      );
    }
  }

  return (
    <div className="relative rounded">
      <button
        onClick={() =>
          signIn("google", {
            callbackUrl: process.env.NEXT_PUBLIC_PAYMENT_LINK!,
          })
        }
        className="glowbttn py-3 font-bold text-white transition-shadow duration-300 bg-black rounded shadow-2xl focus-within:ring-4 px-7 hover:bg-text-rad hover:shadow-none"
      >
        Get Early Access
      </button>
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <div className="h-screen">
      <Head>
        <title>Unsub</title>
        <meta name="description" content="Take back control of your email." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        <div className="flex flex-col items-center justify-center min-h-full pt-60 px-10">
          <h2 className="mt-2 text-3xl font-bold text-center">
            Take back control of your email.
          </h2>
          <p className="relative mb-4 text-base text-center">
            See the emails you want. Automatically unsubscribe from the rest
            with unsub.
            <span className="-top-1"> ✨</span>
          </p>
          <EarlyAccessButton />
        </div>
      </main>

      <footer className="absolute bottom-0 w-screen text-center">
        <h3>
          Built by{" "}
          <a
            href="https://twitter.com/_heyglassy"
            className="text-blue-700 underline"
          >
            Glassy Ventures
          </a>
        </h3>
      </footer>
    </div>
  );
};

export default Home;
