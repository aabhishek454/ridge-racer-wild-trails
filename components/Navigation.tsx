"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Car, Map, Target, Settings } from "lucide-react";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/garage", label: "Garage", icon: Car },
  { href: "/maps", label: "Maps", icon: Map },
  { href: "/missions", label: "Missions", icon: Target },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Navigation() {
  const pathname = usePathname();
  if (pathname?.startsWith("/game")) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-xl border-t border-white/10 safe-bottom">
      <div className="max-w-lg mx-auto flex justify-around items-center h-16 px-2">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition ${
                active ? "text-cyan-400" : "text-white/50 hover:text-white/80"
              }`}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
