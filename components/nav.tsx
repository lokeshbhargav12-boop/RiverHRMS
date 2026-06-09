"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { navItems } from "@/lib/content";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="logo-link" href="#top" aria-label="RIVER HRMS home">
        <Image src="/logo_HR.png" alt="Neyvin Technologies" width={64} height={53} />
        <span>RIVER HRMS</span>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <a className="nav-cta" href="#packages">
        Packages
      </a>
      <button className="menu-button" type="button" aria-label="Open navigation menu" onClick={() => setOpen(true)}>
        <Menu size={22} />
      </button>
      {open && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <button className="menu-close" type="button" aria-label="Close navigation menu" onClick={() => setOpen(false)}>
            <X size={22} />
          </button>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
