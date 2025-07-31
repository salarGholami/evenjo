"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CountrySelect from "../ui/CountrySelect/CountrySelect";
import { useState } from "react";
import Avatar from "../ui/avatar/Avatar";
import Button from "../ui/Button/Button";

type Props = {};

const navLinks = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Shows", href: "/shows" },
  { id: 3, name: "Concerts", href: "/concerts" },
  { id: 4, name: "Sports", href: "/sports" },
  { id: 5, name: "Festivals", href: "/festivals" },
];

const countries = [
  { code: "US", label: "USA", flag: "https://flagcdn.com/us.svg" },
  { code: "IR", label: "IRI", flag: "https://flagcdn.com/ir.svg" },
  { code: "GB", label: "GBP", flag: "https://flagcdn.com/gb.svg" },
  { code: "FR", label: "FRA", flag: "https://flagcdn.com/fr.svg" },
  { code: "JP", label: "JPY", flag: "https://flagcdn.com/jp.svg" },
];

const Header = (props: Props) => {
  const pathname = usePathname();
  return (
    <header className="z-10 bg-transparent sticky top-0 transition-all duration-200">
      <nav className="container xl:max-w-screen-xl mx-auto">
        <ul className="flex items-center justify-between py-2">
          <li>
            <Image
              src="/images/logo/Evenjo.png"
              alt="Logo"
              width={100}
              height={100}
            />
          </li>
          <li className="py-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={clsx(
                    "relative px-5 py-2 font-medium transition-all duration-300",
                    isActive
                      ? "link-active-glow"
                      : "text-gray-400 hover:text-white"
                  )}
                >
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </li>
          <li>
            <Auth />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

function Auth() {
  const [selected, setSelected] = useState(countries[0]);
  const user = 0;
  if (user === 0) {
    return (
      <div className="flex items-center">
        {/* Language Selector */}
        <div className="flex items-center cursor-pointer px-2 py-1 rounded-md">
          <CountrySelect
            options={countries}
            value={selected}
            onChange={setSelected}
          />
        </div>
        <div className="flex gap-1">
          <Button
            onClick={() => {
              console.log("register btn clicked");
            }}
          >
            Register
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              console.log("login btn clicked");
            }}
          >
            Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center text-white">
      {/* Notification Icon */}
      <button className="p-2 hover:bg-Neutral-700 rounded-full cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      </button>

      {/* Language Selector */}
      <div className="flex items-center gap-1 cursor-pointer px-2 py-1 rounded-md">
        <CountrySelect
          options={countries}
          value={selected}
          onChange={setSelected}
        />
      </div>

      {/* Avatar */}
      <div className="relative w-8 h-8">
        <Avatar src="/images/avatar/avatar.png" size={40} />
      </div>
    </div>
  );
}
