import { useSession } from "next-auth/react";
import Header from "components/Header";
import { trpc } from "utils/trpc";
import type { NextPageWithAuth } from "@/lib/types";
import Email from "components/email-subscription";
import { useState } from "react";

const Subscriptions: NextPageWithAuth = () => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<Array<string>>([]);
  const { data: session } = useSession();
  const scanEmail = trpc.useMutation(["scan-email"]);
  const getEmails = trpc.useQuery([
    "get-emails",
    {
      email: session?.user ? session.user.email! : null, // TODO: fix this
    },
  ]);

  const onSelect = (id: string) => {
    setSelected(selected.concat(id));
  };

  return (
    <div className="h-screen">
      <Header />
      <div className="px-20">
        <h1>{selected}</h1>
        <div className="flex flex-row justify-between mt-10">
          <h1 className="text-xl font-bold">Email Subscriptions</h1>
          <div className="flex gap-8">
            {show && (
              <div className="relative rounded">
                <button
                  className="glowbttn py-3 font-bold text-white transition-shadow duration-300 bg-black rounded shadow-2xl focus-within:ring-4 px-7 hover:bg-text-rad hover:shadow-none"
                  onClick={() => {
                    setSelected([]);
                    setShow(!show);
                  }}
                >
                  Reset
                </button>
              </div>
            )}
            <div className="relative rounded">
              <button
                className="glowbttn py-3 font-bold text-white transition-shadow duration-300 bg-black rounded shadow-2xl focus-within:ring-4 px-7 hover:bg-text-rad hover:shadow-none"
                onClick={() => setShow(!show)}
              >
                Unsubscribe
              </button>
            </div>
            <div className="relative rounded">
              <button
                className="glowbttn py-3 font-bold text-white transition-shadow duration-300 bg-black rounded shadow-2xl focus-within:ring-4 px-7 hover:bg-text-rad hover:shadow-none"
                onClick={() => getEmails.refetch()}
              >
                Scan Email
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap mt-5">
          {getEmails.data ? (
            getEmails.data.map((email, key) => (
              <Email show={show} email={email} onSelect={onSelect} key={key} />
            ))
          ) : (
            <div className="w-screen">
              <h1 className="text-center font-bold text-xl">
                Click Scan Email to get started!
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Subscriptions.auth = true;

export default Subscriptions;
