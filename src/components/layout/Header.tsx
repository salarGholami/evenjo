"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import CountrySelect from "../ui/CountrySelect/CountrySelect";

type Country = {
  code?: string;
  label: string;
  flag: string;
};

const navLinks = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Shows", href: "/shows" },
  { id: 3, name: "Concerts", href: "/concerts" },
  { id: 4, name: "Sports", href: "/sports" },
  { id: 5, name: "Festivals", href: "/festivals" },
];

const countries: Country[] = [
  { code: "US", label: "USA", flag: "https://flagcdn.com/us.svg" },
  { code: "IR", label: "IRI", flag: "https://flagcdn.com/ir.svg" },
  { code: "GB", label: "GBP", flag: "https://flagcdn.com/gb.svg" },
  { code: "FR", label: "FRA", flag: "https://flagcdn.com/fr.svg" },
  { code: "JP", label: "JPY", flag: "https://flagcdn.com/jp.svg" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed w-full top-0 left-0 z-50 transition-all duration-300",
        scrolled ? "backdrop-blur-md bg-black/60 " : "bg-transparent"
      )}
    >
      <nav className="container xl:max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* لوگو */}
          <div className="flex items-center gap-4">
            <Image
              src="/images/logo/Evenjo.png"
              alt="Logo"
              width={80}
              height={80}
              className="w-20 sm:w-24 h-auto"
            />
          </div>

          {/* ناوبری دسکتاپ */}
          <ul className="hidden md:flex gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className={clsx(
                      "relative px-4 py-2 font-medium transition-colors duration-300",
                      isActive
                        ? "link-active-glow"
                        : "text-gray-400 hover:text-tint-500"
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* بخش احراز هویت و کشور */}
          <div className="hidden md:flex items-center gap-4">
            <CountrySelect
              options={countries}
              value={countries[0]}
              onChange={() => {}}
            />
            <button
              onClick={() => router.push("/register")}
              className="px-4 py-2 bg-tint-500 rounded-md text-white font-medium hover:bg-tint-600 transition"
            >
              Register
            </button>
          </div>

          {/* دکمه منوی موبایل */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-white hover:bg-tint-600 transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* منوی موبایل */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/80 backdrop-blur-md rounded-md py-4 mt-2">
            <ul className="flex flex-col gap-3 px-4">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={clsx(
                      "block px-4 py-2 rounded-md transition-colors duration-200",
                      pathname === link.href
                        ? "bg-tint-600 text-white font-semibold"
                        : "text-gray-300 hover:bg-tint-500 hover:text-white"
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="px-4 mt-4 flex flex-col gap-3">
              <CountrySelect
                options={countries}
                value={countries[0]}
                onChange={() => {}}
              />
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push("/register");
                }}
                className="w-full px-4 py-2 bg-tint-500 rounded-md text-white font-medium hover:bg-tint-600 transition"
              >
                Register
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
