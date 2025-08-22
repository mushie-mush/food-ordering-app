'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface INavItem {
  href: string;
  label: string;
  icon: ReactNode;
}

function NavItem({ href, label, icon }: INavItem) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex  hover:text-gray-600 py-3 ${
        isActive ? 'text-black font-semibold' : 'text-gray-400'
      }`}
    >
      <span className="inline-block mr-4">{icon}</span>
      {label}
    </Link>
  );
}
export default NavItem;
