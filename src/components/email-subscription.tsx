import React, { useEffect, useState } from "react";
import { EmailSubscription } from "@prisma/client";

const Email: React.FC<{
  email: EmailSubscription;
  show: boolean;
  onSelect: (id: string) => void;
}> = ({ email, show, onSelect }) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    !show && setChecked(false);
  }, [show]);

  const handleClick = () => {
    if (!checked) {
      onSelect(email.id);
    }
    setChecked(!checked);
  };

  return (
    <div className="bg-black w-25 h-25 p-3 rounded-lg text-white m-3">
      <div className="flex items-center justify-between">
        <div>
          {show && (
            <input type="checkbox" checked={checked} onChange={handleClick} />
          )}
        </div>
      </div>

      <h1 className="font-bold">{email.companyName}</h1>
      <h2>{email.companyEmail}</h2>
      <h3>{email.subscribed ? "Subscribed" : "Unsubscribed"}</h3>
    </div>
  );
};

export default Email;
