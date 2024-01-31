import { FormEvent, useEffect, useState } from "react";

import ExpandAll from "assets/expand-all.svg";
import Padlock from "assets/padlock.svg";
import ArrowSubmit from "assets/arrow-submit.svg";

import { useAppContext } from "context";
import { isPasswordSet } from "utils/isPasswordSet";
import { setCookie } from "utils/setCookie";

const Header = () => {
  const passwordIsSet = isPasswordSet();
  const { expandAll } = useAppContext();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (error.length) {
      setShowNotification(true);
      timeout = setTimeout(() => {
        setShowNotification(false);
        setError("");
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [error]);

  const setPasswordCookie = () => {
    if (value === process.env.PASSWORD) {
      setCookie();
      setError("You can now view all the projects!");
    } else {
      setError("Password not correct!");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!value) return;
    setPasswordCookie();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && value) {
      setPasswordCookie();
    }
    if (event.key !== "Enter" && error.length) {
      setError("");
      setShowNotification(false);
    }
  };

  const afterStyles = !passwordIsSet
    ? "after:absolute after:content-[''] after:bg-black after:-bottom-px after:w-full after:h-px"
    : "";

  return (
    <header className="flex justify-between pl-1.5 border-b border-b-grey-1 mb-4">
      <div className="text-black text-lg font-normal pb-2 pt-[9px]">
        Andrew Carter
      </div>
      <div className={`absoluteflex relative ${afterStyles} flex items-center`}>
        {passwordIsSet && expandAll ? <ExpandAll className="mr-3" /> : null}
        {passwordIsSet ? null : (
          <div className="flex items-center">
            <Padlock />
            <input
              type="password"
              id="password"
              placeholder="password"
              value={value}
              onChange={event => setValue(event.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-2 placeholder:text-grey-2 placeholder:text-lg border-0 focus:outline-none focus-visible:outline-none text-black"
            />
            <ArrowSubmit
              className="mr-1.5 cursor-pointer"
              onClick={handleSubmit}
            />
          </div>
        )}
      </div>
      {showNotification && (
        <div className="absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center pointer-events-none">
          <div className="bg-black text-white text-base font-normal py-3.5 px-5 opacity-80 rounded-[14px]">
            {error}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
