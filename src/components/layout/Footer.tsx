import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {};
const navLinks = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Contact us", href: "/shows" },
  { id: 3, name: "About us", href: "/concerts" },
  { id: 4, name: "Privacy Policy", href: "/sports" },
];

const Footer = (props: Props) => {
  return (
    <footer className="z-10 bg-inherit relative bottom-0 transition-all duration-200">
      <nav className="container xl:max-w-screen-xl mx-auto flex justify-center items-center flex-col">
        <div className="">
          <Image
            src="/images/logo/Evenjo.png"
            alt="Logo"
            width={100}
            height={100}
          />
        </div>
        <div className="">
          <ul className="flex items-center justify-between py-2">
            <li className="py-4">
              {navLinks.map((link) => {
                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    className="relative px-5 py-2 font-medium transition-all duration-300"
                  >
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                );
              })}
            </li>
          </ul>
        </div>
        <div className="flex gap-6">
          <Facebook  className="bg-white w-8 h-8 p-2 rounded-full flex justify-center items-center cursor-pointer text-neutral-700"/>
          <Instagram  className="bg-white w-8 h-8 p-2 rounded-full flex justify-center items-center cursor-pointer text-neutral-700"/>
          <Linkedin  className="bg-white w-8 h-8 p-2 rounded-full flex justify-center items-center cursor-pointer text-neutral-700"/>
          <Youtube  className="bg-white w-8 h-8 p-2 rounded-full flex justify-center items-center cursor-pointer text-neutral-700"/>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
