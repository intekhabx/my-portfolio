"use client";

import { FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";


const socials = [
  { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/intekhabx/", label: "LinkedIn" },
  { icon: FaXTwitter , href: "https://x.com/intekhabx", label: "X" },
  { icon: FaInstagram, href: "https://www.instagram.com/_intekhab.x/", label: "Instagram" },
  { icon: MdEmail, href: "mailto:intekhab118211989@gmail.com", label: "Email" },
  { icon: FaGithub, href: "https://github.com/intekhabx", label: "GitHub" },
];

export default function SocialBanner() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 bg-inherit">

      {/* Logo / Monogram */}
      <Link href="/" className="cursor-default">
        <div className="group relative">
          <div className="w-10 h-10 sm:w-full sm:h-full">
              <Image src="/favicon.png" alt="IX" width={52} height={52}/>
          </div>
  
          {/* subtle glow effect */}
          <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-30 bg-blue-500 transition-all duration-300 rounded-full" />
        </div>
      </Link>

      {/* Social icons */}
      <div className="flex items-center gap-5 sm:gap-8">
        {socials.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="relative text-[var(--on-dark)] transition-all duration-400 hover:text-blue-400 hover:-translate-y-1 hover:scale-110"
          >
            <Icon className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px]" />
          </a>
        ))}
      </div>
    </div>
  );
}