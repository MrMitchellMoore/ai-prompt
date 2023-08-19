"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

export default function Nav() {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDown, setToggleDown] = useState(Boolean(false));

  useEffect(() => {
    const setAllProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };
    setAllProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link
        href={"/"}
        className="flex gap-2 flex-center w-1/4 md:h-[133px] bg-transparent"
      >
        <Image
          className="object-contain md:h-[133px]"
          alt="logo"
          src={"/ai.png"}
          width={100}
          height={100}
        />
        <p className="logo_text">Prompted-Ai</p>
      </Link>
      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link className="black_btn font-bold" href={"/create-prompt"}>
              Create Post
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="outline_btn font-bold"
            >
              Sign Out
            </button>
            <Link className="flex-center h-auto w-fit" href={"/profile"}>
              <Image
                alt="profile"
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full object-center object-contain cursor-pointer transition ease-out delay-300 hover:translate-x-6 hover:translate-y-2 hover:scale-110 duration-300"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sing In
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className="sm:hidden relative flex">
        {session?.user ? (
          <div className="flex space-x-2">
            <Image
              alt="profile"
              src={session?.user.image}
              width={37}
              height={37}
              className="object-contain cursor-pointer transition ease-out delay-300 hover:-translate-x-6 hover:-translate-y-2 hover:scale-110 duration-300 rounded-full object-center"
            />
            <Image
              alt="profile"
              src={"/images/menu.svg"}
              width={37}
              height={37}
              className="object-contain cursor-pointer"
              onClick={() => {
                setToggleDown((prev) => !prev);
              }}
            />
            {toggleDown && (
              <div className="dropdown">
                <Link
                  href={"/profile"}
                  className="downdown_link hover:bg-slate-500 hover:rounded hover:w-full hover:text-white hover:text-center"
                  onClick={() => setToggleDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href={"/create-prompt"}
                  className="downdown_link hover:bg-slate-500 hover:rounded hover:w-full hover:text-white hover:text-center"
                  onClick={() => setToggleDown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  className="mt-5 w-full black_btn"
                  type="button"
                  onClick={() => {
                    setToggleDown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sing In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
}
