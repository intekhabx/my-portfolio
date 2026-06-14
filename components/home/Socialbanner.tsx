"use client";

import { FaLinkedinIn, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Image from "next/image";

const socials = [
  { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/intekhabx/", label: "LinkedIn" },
  { icon: FaTwitter, href: "https://x.com/intekhab_x", label: "Twitter" },
  { icon: FaInstagram, href: "https://www.instagram.com/_intekhab.x/", label: "Instagram" },
  { icon: MdEmail, href: "mailto:intekhab118211989@gmail.com", label: "Email" },
  { icon: FaGithub, href: "https://github.com/intekhabx", label: "GitHub" },
];

export default function SocialBanner() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-14 border-b border-[var(--line)]">

      {/* Logo / Monogram */}
      <div className="group relative">
          <Image src="/favicon.png" alt="IX" width={52} height={52} />

        {/* subtle glow effect */}
        <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-30 bg-blue-500 transition-all duration-300 rounded-full" />
      </div>

      {/* Social icons */}
      <div className="flex items-center gap-8">
        {socials.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="relative text-[var(--ink-soft)] transition-all duration-300 hover:text-blue-400 hover:-translate-y-1 hover:scale-125"
          >
            <Icon size={24} />
          </a>
        ))}
      </div>
    </div>
  );
}