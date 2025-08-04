import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Contact Us", href: "/contact" },
  { id: 3, name: "About Us", href: "/about" },
  { id: 4, name: "Privacy Policy", href: "/privacy" },
];

const socialLinks = [
  {
    icon: <Facebook className="w-4 h-4" />,
    href: "https://facebook.com",
    label: "Facebook",
  },
  {
    icon: <Instagram className="w-4 h-4" />,
    href: "https://instagram.com",
    label: "Instagram",
  },
  {
    icon: <Linkedin className="w-4 h-4" />,
    href: "https://linkedin.com",
    label: "LinkedIn",
  },
  {
    icon: <Youtube className="w-4 h-4" />,
    href: "https://youtube.com",
    label: "YouTube",
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-neutral-950 text-white border-t border-neutral-800">
      <div className="container mx-auto px-4 py-8 max-w-screen-xl flex flex-col items-center gap-6">
        {/* Logo */}
        <div>
          <Image
            src="/images/logo/Evenjo.png"
            alt="Logo"
            width={120}
            height={120}
            className="object-contain"
          />
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-wrap justify-center gap-4 text-sm text-neutral-400">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                href={link.href}
                className="hover:text-tint-400 transition-colors duration-200"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Social Icons */}
        <div className="flex gap-4">
          {socialLinks.map(({ icon, href, label }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="bg-white p-2 rounded-full text-neutral-700 hover:bg-tint-500 hover:text-white transition-colors duration-300"
            >
              {icon}
            </Link>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="w-full border-t border-neutral-800 pt-4 text-center text-sm text-neutral-500">
          CopyRight &copy; {new Date().getFullYear()} Salar Gholami. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
